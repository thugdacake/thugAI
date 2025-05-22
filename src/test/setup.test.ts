it('should have jest-dom matchers', () => {
  const element = document.createElement('div');
  document.body.appendChild(element);
  expect(element).toBeInTheDocument();
  document.body.removeChild(element);
});
