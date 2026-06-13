const form = document.getElementById('mortgage-form');
if (form) {
  const results = document.getElementById('results');
  const errorEl = document.getElementById('error');

  const currency = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  });

  function calculatePayment(principal, annualRate, years) {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;

    if (monthlyRate === 0) {
      return principal / months;
    }

    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * factor) / (factor - 1);
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    results.hidden = true;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = '';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const principal = Number(document.getElementById('principal').value);
    const rate = Number(document.getElementById('rate').value);
    const years = Number(document.getElementById('years').value);

    if (!Number.isFinite(principal) || principal <= 0) {
      showError('請輸入有效的貸款金額。');
      return;
    }

    if (!Number.isFinite(rate) || rate < 0) {
      showError('請輸入有效的年利率。');
      return;
    }

    if (!Number.isFinite(years) || years <= 0) {
      showError('請輸入有效的貸款年限。');
      return;
    }

    const monthly = calculatePayment(principal, rate, years);
    const totalPaid = monthly * years * 12;
    const totalInterest = totalPaid - principal;

    document.getElementById('monthly').textContent = currency.format(monthly);
    document.getElementById('total-paid').textContent = currency.format(totalPaid);
    document.getElementById('total-interest').textContent = currency.format(totalInterest);
    results.hidden = false;
  });

  form.requestSubmit();
}
