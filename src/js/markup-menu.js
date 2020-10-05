(() => {
  function findFiles(files) {
    const filesList = files.keys();
    if (filesList.length < 2) {
      return;
    }
    const nav = document.createElement('div');
    const style = document.createElement('style');
    const button = document.createElement('button');
    const wrapper = document.createElement('div');
    wrapper.appendChild(button);
    wrapper.appendChild(nav);
    wrapper.className = 'helper-nav-wrapper';
    button.innerHTML = 'Open pages list';
    button.className = 'helper-nav-button';
    nav.className = 'helper-nav';
    style.innerHTML = `.helper-nav a:hover {
      color:#fff;
      background-color:#000;
    }
    .helper-nav a {
      display:block;
      color: #000;
      padding: 3px;
      margin:0
    }
    .helper-nav-button {
      background: #000;
      color: #fff;
      padding: 5px;
      font-weight: 300;
      font-size: 12px;
      border: none;
      border-radius: 3px 0 0 0;
      cursor: pointer;
    }
    .helper-nav-wrapper {
      position: fixed;
      bottom: 0;
      right: 0;
      font-family: monospace;
      z-index: 9999;
      text-align: right;
      font-size: 14px;
    }
    .helper-nav {
      text-align: left;
      background-color: #fff;
      border: 1px solid #000;
      padding: 3px;
      boxShadow: 0 0 40px 0 rgba(0,0,0,.2);
      max-height: 300px;
      overflow-y: auto;
    }
    @media all and (max-width:1024px) {
      .helper-nav {
        height: 160px;
        overflow-y: scroll;
      }
    }`;
    document.head.appendChild(style);
    // eslint-disable-next-line array-callback-return
    filesList.map((key) => {
      nav.innerHTML += `<a href="./${key}">${key}</a>`;
    });
    document.body.appendChild(wrapper);
    let flag = localStorage.getItem('flag')
      ? JSON.parse(localStorage.getItem('flag'))
      : false;
    const display = flag ? 'block' : 'none';
    const btnText = flag ? 'Close pages list' : 'Open pages list';
    nav.style.display = display;
    button.innerHTML = btnText;

    function toggleNav() {
      if (flag) {
        nav.style.display = 'none';
        button.innerHTML = 'Open pages list';
      } else {
        nav.style.display = 'block';
        button.innerHTML = 'Close pages list';
      }
      flag = !flag;
      localStorage.setItem('flag', flag);
    }
    document.addEventListener('keyup', (e) => {
      if (e.type === 'keyup' && e.ctrlKey && e.keyCode === 88) {
        toggleNav();
      }
    });
    button.addEventListener('click', toggleNav);
  }

  findFiles(require.context('../html', true, /\.html$/));
})();
