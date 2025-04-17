import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const dev = process.env.NODE_ENV === 'development';

const config = {
  kit: {
    adapter: adapter({
      fallback: '200.html'
    }),
    paths: {
      base: dev ? '' : '/Mi-portafolio-personal'
    }
  }
};

export default config;
