describe("Login", () => {
  function email() {
    return cy.get("#email");
  }
  function password() {
    return cy.get("#password");
  }
  function loginBtn() {
    return cy.get("#login-btn");
  }

  beforeEach(() => {
    cy.visit(Cypress.config("loginUrl"));
    email().clear();
    password().clear();
  });

  it("greets with sign in", () => {
    cy.get("#sign-title").contains("Sign into");
  });

  it("links to register", () => {
    cy.get("#register-link").click();
    cy.url().should("include", "register");
  });

  it("requires email", () => {
    password().type(Cypress.config("wrong-password"));
    loginBtn().click();
    cy.get("#email-error").contains("required");
  });

  it("requires password", () => {
    email().type(Cypress.config("email"));
    loginBtn().click();
    cy.get("#password-error").contains("required");
  });

  it("requires valid email and password", () => {
    email().type(Cypress.config("email"));
    password().type(Cypress.config("wrong-password"));
    loginBtn().click();
    cy.get("#error-msg").contains("Bad credentials");
  });

  it("navigates to dashboard on successful login", () => {
    email().type(Cypress.config("email"));
    password().type(Cypress.config("password"));
    loginBtn().click();
    cy.url().should("include", "dashboard");
  });
});
