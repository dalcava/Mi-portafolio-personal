import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: '200.html'
    }),
    paths: {
      base: process.env.NODE_ENV === 'development' ? '' : '/Mi-portafolio-personal'
    }
  }
};

export default config;
