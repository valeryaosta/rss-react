const useRouter = jest.fn();

useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
}));

module.exports = {
  useRouter,
};
