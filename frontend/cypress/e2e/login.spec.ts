// cypress/e2e/login.spec.ts

describe('Login flow', () => {
  it('should allow a user to log in with valid credentials', () => {
    cy.visit('/login');

    // Asegura que estás en la página de login
    cy.contains('Iniciar sesión');

    // Llena el formulario
    cy.get('[data-cy="login-email"]').type('user@example.com');
    cy.get('[data-cy="login-password"]').type('supersecret');

    // Envía el formulario
    cy.get('[data-cy="login-submit"]').click();

    // Espera la navegación al dashboard
    cy.url().should('include', '/dashboard');

    // Asegúrate que algo del dashboard esté visible
    cy.contains('Bienvenido');
  });

  it('should show an error on invalid credentials', () => {
    cy.visit('/login');

    cy.get('[data-cy="login-email"]').type('invalid@example.com');
    cy.get('[data-cy="login-password"]').type('wrongpass');

    cy.get('[data-cy="login-submit"]').click();

    // Verifica que aparece la notificación de error
    cy.contains('Credenciales inválidas');
  });
});