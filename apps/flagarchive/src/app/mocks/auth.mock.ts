export class MockAuthService {
  auth = {
    onAuthStateChange: () => ({
      data: {},
    }),
  };
  currentUser = () => ({
    email: '',
    username: '',
  });
}
