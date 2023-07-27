module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        autodesktop: "repeat(auto-fit, minmax(410px, 1fr))",
        automobile: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      screens: {
        xs: "425px",
        // => @media (min-width: 425px) { ... }

        "2xl": "1440px",
        // => @media (min-width: 1440px) { ... }
      },
      blur: {
        "4xl": "5rem",
      },
      spacing: {
        98: "29rem",
        97: "28rem",
        99: "56rem",
      },
      colors: {
        sauced: {
          orange: "hsla(19, 100%, 50%, 1)",
          light: "hsl(24, 100%, 95%)",
        },
        gradient: {
          "dark-two": "hsl(26, 54%, 15%)",
          "dark-one": "hsl(23, 75%, 5%)",
          "orange-one": "	hsl(33, 100%, 50%)",
          "orange-two": "	hsl(19, 100%, 50%)",
        },
        light: {
          slate: {
            1: "hsl(206, 30.0%, 98.8%)",
            2: "hsl(210, 16.7%, 97.6%)",
            3: "hsl(209, 13.3%, 95.3%)",
            4: "hsl(209, 12.2%, 93.2%)",
            5: "hsl(208, 11.7%, 91.1%)",
            6: "hsl(208, 11.3%, 88.9%)",
            7: "hsl(207, 11.1%, 85.9%)",
            8: "hsl(205, 10.7%, 78.0%)",
            9: "hsl(206, 6.0%, 56.1%)",
            10: "hsl(206, 5.8%, 52.3%)",
            11: "hsl(206, 6.0%, 43.5%)",
            12: "hsl(206, 24.0%, 9.0%)",
          },
          "slate-opacity": {
            1: "hsla(210, 92.6%, 26.5%, 0.016)",
            2: "hsla(210, 87.7%, 16.0%, 0.028)",
            3: "hsla(210, 98.8%, 14.4%, 0.055)",
            4: "hsla(210, 94.1%, 11.1%, 0.075)",
            5: "hsla(216, 91.1%, 10.9%, 0.099)",
            6: "hsla(206, 96.4%, 11.3%, 0.126)",
            7: "hsla(210, 99.1%, 10.1%, 0.157)",
            8: "hsla(205, 96.5%, 10.0%, 0.244)",
            9: "hsla(206, 98.8%, 5.9%, 0.467)",
            10: "hsla(206, 99.6%, 5.4%, 0.506)",
            11: "hsla(206, 97.0%, 4.8%, 0.593)",
            12: "hsla(202, 97.0%, 2.4%, 0.934)",
          },
          orange: {
            1: "hsl(24, 70.0%, 99.0%)",
            2: "hsl(24, 83.3%, 97.6%)",
            3: "hsl(24, 100%, 95.3%)",
            4: "hsl(25, 100%, 92.2%)",
            5: "hsl(25, 100%, 88.2%)",
            6: "hsl(25, 100%, 82.8%)",
            7: "hsl(24, 100%, 75.3%)",
            8: "hsl(24, 94.5%, 64.3%)",
            9: "hsl(24, 94.0%, 50.0%)",
            10: "hsl(24, 100%, 46.5%)",
            11: "hsl(24, 100%, 37.0%)",
            12: "hsl(15, 60.0%, 17.0%)",
          },
          blue: {
            1: "hsl(206, 100%, 99.2%)",
            2: "hsl(210, 100%, 98.0%)",
            3: "hsl(209, 100%, 96.5%)",
            4: "hsl(210, 98.8%, 94.0%)",
            5: "hsl(209, 95.0%, 90.1%)",
            6: "hsl(209, 81.2%, 84.5%)",
            7: "hsl(208, 77.5%, 76.9%)",
            8: "hsl(206, 81.9%, 65.3%)",
            9: "hsl(206, 100%, 50.0%)",
            10: "hsl(208, 100%, 47.3%)",
            11: "hsl(211, 100%, 43.2%)",
            12: "hsl(211, 100%, 15.0%)",
          },
          red: {
            1: "hsl(359, 100%, 99.4%)",
            2: "hsl(359, 100%, 98.6%)",
            3: "hsl(360, 100%, 96.8%)",
            4: "hsl(360, 97.9%, 94.8%)",
            5: "hsl(360, 90.2%, 91.9%)",
            6: "hsl(360, 81.7%, 87.8%)",
            7: "hsl(359, 74.2%, 81.7%)",
            8: "hsl(359, 69.5%, 74.3%)",
            9: "hsl(358, 75.0%, 59.0%)",
            10: "hsl(358, 69.4%, 55.2%)",
            11: "hsl(358, 65.0%, 48.7%)",
            12: "hsl(354, 50.0%, 14.6%)",
          },
          grass: {
            1: "hsl(116, 50.0%, 98.9%)",
            2: "hsl(120, 60.0%, 97.1%)",
            3: "hsl(120, 53.6%, 94.8%)",
            4: "hsl(121, 47.5%, 91.4%)",
            5: "hsl(122, 42.6%, 86.5%)",
            6: "hsl(124, 39.0%, 79.7%)",
            7: "hsl(126, 37.1%, 70.2%)",
            8: "hsl(131, 38.1%, 56.3%)",
            9: "hsl(131, 41.0%, 46.5%)",
            10: "hsl(132, 43.1%, 42.2%)",
            11: "hsl(133, 50.0%, 32.5%)",
            12: "hsl(130, 30.0%, 14.9%)",
          },
        },
        dark: {
          slate: {
            1: "hsl(200, 7.0%, 8.8%)",
            2: "hsl(195, 7.1%, 11.0%)",
            3: "hsl(197, 6.8%, 13.6%)",
            4: "hsl(198, 6.6%, 15.8%)",
            5: "hsl(199, 6.4%, 17.9%)",
            6: "hsl(201, 6.2%, 20.5%)",
            7: "hsl(203, 6.0%, 24.3%)",
            8: "hsl(207, 5.6%, 31.6%)",
            9: "hsl(206, 6.0%, 43.9%)",
            10: "hsl(206, 5.2%, 49.5%)",
            11: "hsl(206, 6.0%, 63.0%)",
            12: "hsl(210, 6.0%, 93.0%)",
          },
          "slate-opacity": {
            1: "hsla(0, 0%, 0%, 0)",
            2: "hsla(181, 98.9%, 91.8%, 0.026)",
            3: "hsla(182, 86.7%, 91.4%, 0.057)",
            4: "hsla(209, 86.7%, 93.9%, 0.083)",
            5: "hsla(200, 90.3%, 93.4%, 0.109)",
            6: "hsla(209, 95.3%, 93.5%, 0.139)",
            7: "hsla(204, 98.5%, 93.9%, 0.182)",
            8: "hsla(209, 94.0%, 94.7%, 0.265)",
            9: "hsla(207, 97.3%, 94.0%, 0.412)",
            10: "hsla(209, 99.4%, 95.2%, 0.472)",
            11: "hsla(208, 98.7%, 96.8%, 0.615)",
            12: "hsla(211, 86.7%, 99.6%, 0.927)",
          },
          orange: {
            1: "hsl(30, 70.0%, 7.2%)",
            2: "hsl(28, 100%, 8.4%)",
            3: "hsl(26, 91.1%, 11.6%)",
            4: "hsl(25, 88.3%, 14.1%)",
            5: "hsl(24, 87.6%, 16.6%)",
            6: "hsl(24, 88.6%, 19.8%)",
            7: "hsl(24, 92.4%, 24.0%)",
            8: "hsl(25, 100%, 29.0%)",
            9: "hsl(24, 94.0%, 50.0%)",
            10: "hsl(24, 100%, 58.5%)",
            11: "hsl(24, 100%, 62.2%)",
            12: "hsl(24, 97.0%, 93.2%)",
          },
          blue: {
            1: "hsl(212, 35.0%, 9.2%)",
            2: "hsl(216, 50.0%, 11.8%)",
            3: "hsl(214, 59.4%, 15.3%)",
            4: "hsl(214, 65.8%, 17.9%)",
            5: "hsl(213, 71.2%, 20.2%)",
            6: "hsl(212, 77.4%, 23.1%)",
            7: "hsl(211, 85.1%, 27.4%)",
            8: "hsl(211, 89.7%, 34.1%)",
            9: "hsl(206, 100%, 50.0%)",
            10: "hsl(209, 100%, 60.6%)",
            11: "hsl(210, 100%, 66.1%)",
            12: "hsl(206, 98.0%, 95.8%)",
          },
          red: {
            1: "hsl(353, 23.0%, 9.8%)",
            2: "hsl(357, 34.4%, 12.0%)",
            3: "hsl(356, 43.4%, 16.4%)",
            4: "hsl(356, 47.6%, 19.2%)",
            5: "hsl(356, 51.1%, 21.9%)",
            6: "hsl(356, 55.2%, 25.9%)",
            7: "hsl(357, 60.2%, 31.8%)",
            8: "hsl(358, 65.0%, 40.4%)",
            9: "hsl(358, 75.0%, 59.0%)",
            10: "hsl(358, 85.3%, 64.0%)",
            11: "hsl(358, 100%, 69.5%)",
            12: "hsl(351, 89.0%, 96.0%)",
          },
          grass: {
            1: "hsl(146, 30.0%, 7.4%)",
            2: "hsl(136, 33.3%, 8.8%)",
            3: "hsl(137, 36.0%, 11.4%)",
            4: "hsl(137, 37.6%, 13.7%)",
            5: "hsl(136, 38.7%, 16.0%)",
            6: "hsl(135, 39.6%, 19.1%)",
            7: "hsl(134, 40.3%, 23.8%)",
            8: "hsl(131, 40.1%, 30.8%)",
            9: "hsl(131, 41.0%, 46.5%)",
            10: "hsl(131, 39.0%, 52.1%)",
            11: "hsl(131, 43.0%, 57.2%)",
            12: "hsl(137, 72.0%, 94.0%)",
          },
        },
      },
      boxShadow: {
        login: "0px 64px 100px -80px #FF5F13, 0px 16px 56px rgba(181, 107, 72, 0.19)",
        superlative: "0px 22px 24px -8px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.1)",
        paginate: "0px 1px 2px rgba(237, 95, 0, 0.05), 0px 1px 1px rgba(237, 95, 0, 0.05)",
        input: "0px 1px 2px rgba(17, 24, 28, 0.05), 0px 1px 1px rgba(17, 24, 28, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
};
