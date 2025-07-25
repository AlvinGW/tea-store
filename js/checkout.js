document.addEventListener('DOMContentLoaded', () => {
  // Simulate pulling cart total from storage/localStorage
  const subtotal = localStorage.getItem('cartTotal') || 4450;
  const total = subtotal; // Assume free shipping

  document.getElementById('checkout-subtotal').textContent = `KES ${subtotal}`;
  document.getElementById('checkout-total').textContent = `KES ${total}`;

  const form = document.getElementById('checkout-form');
  const message = document.getElementById('checkout-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment-method').value;

    if (!name || !email || !phone || !address || !payment) {
      alert('Please fill in all fields');
      return;
    }

    message.classList.remove('hidden');
    message.textContent = 'Processing payment...';

    // Simulate payment process
    setTimeout(() => {
      message.textContent = `Thank you, ${name}! Your order has been placed.`;
      form.reset();
      localStorage.removeItem('cartTotal'); // Clear cart after checkout
    }, 2000);
  });
});
