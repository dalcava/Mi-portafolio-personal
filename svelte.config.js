import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html', // Para GitHub Pages
      precompress: false
    }),
    paths: {
      base: '/Mi-portafolio-personal',
    }
  }
};

export default config;
