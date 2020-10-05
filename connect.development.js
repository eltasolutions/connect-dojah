const widgetUrl = "https://services.elta.com.ng/doja_widget/"

const spinnerHtml = `
<div class="connect__spinner">
  <div class="connect__spinner__bar1"></div>
  <div class="connect__spinner__bar2"></div>
  <div class="connect__spinner__bar3"></div>
  <div class="connect__spinner__bar4"></div>
  <div class="connect__spinner__bar5"></div>
  <div class="connect__spinner__bar6"></div>
  <div class="connect__spinner__bar7"></div>
  <div class="connect__spinner__bar8"></div>
  <div class="connect__spinner__bar9"></div>
  <div class="connect__spinner__bar10"></div>
  <div class="connect__spinner__bar11"></div>
  <div class="connect__spinner__bar12"></div>
</div>
`

const styles = `
#connect__overlay{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    pointer-events: none;
    z-index: 10000
}

#connect__modal {
    background: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transition: ease-in-out 0.4s;
    display: none;

    z-index: 100000;
    border-radius: 10px;
}

#connect__iframe {
    border: none;
}

#connect__modal.active {
    display: block;
    transform: translate(-50%, -50%);
}

#connect__overlay.active {
    pointer-events: all;
    opacity: 1;
}
.connect__spinner {
    position: fixed;
    top: 40%;
    left: 50%;
    width: 40px;
    height: 40px;
    display: none;
    z-index: 100000;

}
.connect__spinner.active {
    display: inline-block;
    transform: translate(-50%, -50%);
}
.connect__spinner div {
    width: 6%;
    height: 16%;
    background: #fff;
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    -webkit-border-radius: 50px;
    -webkit-box-shadow: 0 0 3px rgba(0,0,0,0.2);
    -webkit-animation: fade 1s linear infinite;
  }

  @-webkit-keyframes fade {
    from {opacity: 1;}
    to {opacity: 0.25;}
  }
  .connect__spinner div.connect__spinner__bar1 {
    -webkit-transform:rotate(0deg) translate(0, -130%);
    -webkit-animation-delay: 0s;
  }
  .connect__spinner div.connect__spinner__bar2 {
    -webkit-transform:rotate(30deg) translate(0, -130%);
    -webkit-animation-delay: -0.9167s;
  }
  .connect__spinner div.connect__spinner__bar3 {
    -webkit-transform:rotate(60deg) translate(0, -130%);
    -webkit-animation-delay: -0.833s;
  }
  .connect__spinner div.connect__spinner__bar4 {
    -webkit-transform:rotate(90deg) translate(0, -130%);
    -webkit-animation-delay: -0.7497s;
  }
  .connect__spinner div.connect__spinner__bar5 {
    -webkit-transform:rotate(120deg) translate(0, -130%);
    -webkit-animation-delay: -0.667s;
  }
  .connect__spinner div.connect__spinner__bar6 {
    -webkit-transform:rotate(150deg) translate(0, -130%);
    -webkit-animation-delay: -0.5837s;
  }
  .connect__spinner div.connect__spinner__bar7 {
    -webkit-transform:rotate(180deg) translate(0, -130%);
    -webkit-animation-delay: -0.5s;
  }
  .connect__spinner div.connect__spinner__bar8 {
    -webkit-transform:rotate(210deg) translate(0, -130%);
    -webkit-animation-delay: -0.4167s;
  }
  .connect__spinner div.connect__spinner__bar9 {
    -webkit-transform:rotate(240deg) translate(0, -130%);
    -webkit-animation-delay: -0.333s;
  }
  .connect__spinner div.connect__spinner__bar10 {
    -webkit-transform:rotate(270deg) translate(0, -130%);
    -webkit-animation-delay: -0.2497s;
  }
  .connect__spinner div.connect__spinner__bar11 {
    -webkit-transform:rotate(300deg) translate(0, -130%);
    -webkit-animation-delay: -0.167s;
  }
  .connect__spinner div.connect__spinner__bar12 {
    -webkit-transform:rotate(330deg) translate(0, -130%);
    -webkit-animation-delay: -0.0833s;
  }
`
class Connect {
  constructor(options) {
    this.options = options
  }
  setup() {
    const s = document.createElement('style')
    s.innerHTML = styles
    document.head.append(s)

    const overlay = document.createElement('div')
    overlay.id = 'connect__overlay'

    document.body.append(overlay)

    const modal = document.createElement('div')
    modal.id = 'connect__modal'

    document.body.append(modal)
    document.body.insertAdjacentHTML('beforeend', spinnerHtml)


    const ifr = document.createElement('iframe')
    ifr.id = 'connect__iframe'
    // ifr.src = `./test.html`
    ifr.src = `${widgetUrl}?app_id=${this.options.app_id}&p_key=${this.options.p_key}`
    ifr.width = "360px"
    ifr.height = "600px"

    modal.appendChild(ifr)

    //attach event listener
    var self = this
    var callback, msg
    msg = "message"
    callback = (e) => {
      const { data } = e;
      if (data) {
        if (!data.type) return;
        switch (data.type) {
          case "connect.widget.close":
            self.close()
            break;
          case "connect.account.success":
            self.options.onSuccess(data.response);
            setTimeout(function () {
              self.close()
            }, 1000)
            break;
          case "connect.account.error":
            self.options.onError(data.response);
            break;
          default:
            return null;
        }
      }
    }
    window.addEventListener
      ? window.addEventListener(msg, callback, false)
      :
      window.attachEvent && window.attachEvent("on" + msg, callback)
  }
  open() {
    const overlay = document.querySelector('#connect__overlay')
    const modal = document.querySelector('#connect__modal')
    const spinner = document.querySelector('.connect__spinner')

    spinner.classList.add('active')
    overlay.classList.add('active')

    setTimeout(function () {
      spinner.classList.remove('active')
      modal.classList.add('active')
    }, 1500)


  }
  close() {
    const overlay = document.querySelector('#connect__overlay')
    const modal = document.querySelector('#connect__modal')
    const ifr = document.querySelector('#connect__iframe')

    overlay.classList.remove('active')
    modal.classList.remove('active')
    ifr.src += ''

    this.options.onClose()

  }

}


window.Connect = Connect


// transform: translate(-50%, -50%) scale(0);
// transition: ease-in-out 0.4s;


