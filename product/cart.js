// Cart Controller
class CartController {
  constructor() {
    this.cart = [];
    this.loadCart();
    this.updateCartBadge(); // تحديث العداد عند التحميل
  }

  loadCart() {
    try {
      const savedCart = localStorage.getItem('cart');
      this.cart = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cart = [];
    }
  }

  // دالة تحديث عداد العربة
  updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  addItem(product, quantity = 1) {
    try {
      quantity = Math.min(99, Math.max(1, parseInt(quantity) || 1));

      const existingItem = this.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = Math.min(99, existingItem.quantity + quantity);
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          image: product.image,
          quantity: quantity
        });
      }

      this.saveCart();
      this.updateCartBadge();
    } catch (error) {
      console.error('Error adding item:', error);
      this.showNotification('Error adding item to cart', 'danger');
    }
  }

  updateQuantity(productId, newQuantity) {
    try {
      newQuantity = parseInt(newQuantity);
      if (isNaN(newQuantity)) {
        this.showNotification('Invalid quantity value', 'danger');
        return;
      }

      const item = this.cart.find(item => item.id === productId);
      if (item) {
        if (newQuantity > 0) {
          const maxQuantity = 99;
          if (newQuantity > maxQuantity) {
            newQuantity = maxQuantity;
            this.showNotification(`Maximum quantity limit is ${maxQuantity}`, 'warning');
          }

          if (item.quantity !== newQuantity) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartBadge();
            this.updateCartModal();
            this.showNotification('Quantity updated successfully', 'success');
          }
        } else {
          this.removeItem(productId);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      this.showNotification('Error updating quantity', 'danger');
    }
  }

  removeItem(productId) {
    try {
      const index = this.cart.findIndex(item => item.id === productId);
      if (index > -1) {
        const removedItem = this.cart[index];
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartBadge();
        this.updateCartModal();
        this.showNotification(`Removed ${removedItem.name} from cart`, 'danger');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      this.showNotification('Error removing item from cart', 'danger');
    }
  }

  // دالة تحديث نافذة العربة
  updateCartModal() {
    const modalBody = document.querySelector('#cartModal .modal-body');
    if (modalBody) {
      modalBody.innerHTML = this.renderCartItems();
      const totalElement = document.querySelector('#cartModal .modal-footer h5');
      if (totalElement) {
        totalElement.textContent = `Total: $${this.calculateTotal()}`;
      }
    }
  }

  saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartBadge(); // تحديث العداد عند الحفظ
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  calculateTotal() {
    try {
      return this.cart.reduce((sum, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        if (!isNaN(price) && !isNaN(quantity)) {
          return sum + (price * quantity);
        }
        return sum;
      }, 0).toFixed(2);
    } catch (error) {
      console.error('Error calculating total:', error);
      return '0.00';
    }
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification-toast`;
    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fas ${this.getNotificationIcon(type)} me-2"></i>
        <span>${message}</span>
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }

  getNotificationIcon(type) {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'danger': return 'fa-exclamation-circle';
      case 'warning': return 'fa-exclamation-triangle';
      default: return 'fa-info-circle';
    }
  }

  renderCartItems() {
    if (this.cart.length === 0) {
      return `
        <div class="text-center py-5">
          <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
          <h4>Your cart is empty</h4>
        </div>
      `;
    }

    return `
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.cart.map(item => `
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" style="width: 50px;">
                    <span>${item.name}</span>
                  </div>
                </td>
                <td>$${parseFloat(item.price).toFixed(2)}</td>
                <td>
                  <div class="input-group input-group-sm quantity-control" style="width: 120px">
                    <button class="btn btn-outline-danger" type="button"
                      onclick="cartController.updateQuantity(${item.id}, ${parseInt(item.quantity) - 1})">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="form-control text-center"
                      value="${parseInt(item.quantity)}"
                      min="1" max="99"
                      onchange="cartController.updateQuantity(${item.id}, this.value)">
                    <button class="btn btn-outline-success" type="button"
                      onclick="cartController.updateQuantity(${item.id}, ${parseInt(item.quantity) + 1})">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td>$${(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}</td>
                <td>
                  <button class="btn btn-danger btn-sm" onclick="cartController.removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  showCart() {
    const modalHtml = `
      <div class="modal fade" id="cartModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Shopping Cart</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              ${this.renderCartItems()}
            </div>
            <div class="modal-footer">
              <div class="text-end me-3">
                <h5>Total: $${this.calculateTotal()}</h5>
              </div>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
              <button type="button" class="btn btn-primary" onclick="cartController.checkout()">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // إزالة النافذة القديمة إن وجدت
    const existingModal = document.getElementById('cartModal');
    if (existingModal) {
      existingModal.remove();
    }

    // إضافة النافذة الجديدة
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // تهيئة وعرض النافذة
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
  }

  checkout() {
    // Implement checkout logic here
    console.log('Proceeding to checkout with items:', this.cart);
    this.showNotification('Proceeding to checkout...', 'success');
    // You can redirect to checkout page or handle checkout process
  }
}

// تهيئة متحكم العربة
const cartController = new CartController();
