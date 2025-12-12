// src/mocks/authMock.js

// "Banco" em memória – some ao recarregar a página
const users = [];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Cadastro mock
export async function mockRegister({ name, email, password, role, phone, cpf }) {
  await delay(300); // só pra simular requisição

  // verifica se já existe usuário com mesmo e-mail e tipo
  const exists = users.find((u) => u.email === email && u.role === role);
  if (exists) {
    throw new Error("E-mail já cadastrado para esse tipo de conta.");
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    password, // nunca devolveremos a senha
    role,
    phone,
    cpf,
  };

  users.push(user);

  // devolve os dados sem a senha
  const { password: _, ...safeUser } = user;
  return safeUser;
}

// Login mock
export async function mockLogin({ email, password, role }) {
  await delay(300);

  const user = users.find(
    (u) => u.email === email && u.password === password && u.role === role
  );

  if (!user) {
    throw new Error("Usuário ou senha inválidos (mock).");
  }

  const { password: _, ...safeUser } = user;
  return safeUser;
}
