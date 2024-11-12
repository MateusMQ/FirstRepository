// Função para adicionar valores à lista
function addValue() {
  const input = document.getElementById('inputValue');
  const valueList = document.getElementById('valueList');

  // Verifica se o campo de entrada não está vazio
  if (input.value.trim() !== "") {
    const li = document.createElement('li');
    li.textContent = input.value;
    valueList.appendChild(li);
    input.value = ""; // Limpa o campo de entrada
  }
}
