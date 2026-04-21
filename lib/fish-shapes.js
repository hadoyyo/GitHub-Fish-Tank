const FISH_SHAPES = {
  // Default shapes

  default: (color) => `
    <g>
      <circle cx="7.071" cy="-6.202" r="1.772" fill="#000" style="stroke-width:1"/>
      <circle cx="7.324" cy="-6.616" r="0.8" fill="#fff" style="stroke-width:1"/>
      <path d="M -17.621 -3.973 C -7.621 -10.64 2.379 -10.64 12.379 -3.973 C 2.379 2.693 -7.621 2.693 -17.621 -3.973" fill="${color}" style="stroke-width:1"/>
      <path d="M -17.621 -5.495 L -12.621 3.505 L -12.621 -12.495 L -17.621 -5.495 Z" fill="${color}" opacity=".9" style="stroke-width: 1; transform-origin: -15.121px -4.495px;" transform="matrix(-1, 0, 0, -1, -0.00000572, -0.00000286)"/>
      <circle cx="4.379" cy="-5.973" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="4.879" cy="-6.473" r="0.8" fill="#fff" style="stroke-width:1"/>
    </g>
  `,

  round: (color) => `
    <g>
      <ellipse cx="6.873" cy="-2.533" rx="18" ry="12" fill="${color}" style="stroke-width: 1;"/>
      <path d="M -9.296 -2.533 L -16.296 -8.533 L -16.296 3.467 L -9.296 -2.533 Z" fill="${color}" opacity="0.9" style="stroke-width: 1;"/>
      <circle cx="14.873" cy="-5.533" r="2.5" fill="#000" style="stroke-width: 1;"/>
      <circle cx="15.373" cy="-6.033" r="1" fill="#fff" style="stroke-width: 1;"/>
      <path d="M 1.846 -10.624 L -5.154 -16.624 L -5.154 -4.624 L 1.846 -10.624 Z" fill="${color}" opacity="0.9" style="stroke-width: 1;"/>
      <path style="fill: none; stroke: rgb(0, 0, 0);" d="M 18.686 -11.419 C 21.626 -14.173 29.174 -16.239 30.445 -12.849"/>
      <ellipse cx="30.446" cy="-11.656" rx="1.599" ry="1.599" color="yellow" fill="yellow"/>
    </g>
  `,

  long: (color) => `
    <g>
      <circle cx="23.228" cy="-5.144" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="23.728" cy="-5.644" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M-17.001-2.599q10 8 25 5 10-3 20-5-10-2-20-5-15-3-25 5" fill="${color}" style="stroke-width:1;transform-origin:5.499px -2.599px" transform="scale(-1)"/>
      <circle cx="21.111" cy="-4.52" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="21.611" cy="-5.02" r=".8" fill="#fff" style="stroke-width:1"/>
      <path style="fill:${color};stroke-width:0;stroke-miterlimit:1;stroke-linejoin:round" d="M-18.391-6.188s1.166 2.735 1.563 3.729l-1.734 3.37 10.8-3.677z"/>
      <path style="fill:${color};stroke-width:1" d="M11.745 2.554 15 2.438 8.788 5.423l1.168-2.616z"/>
    </g>
  `,

  angel: (color) => `
    <g>
      <ellipse cx="2.125" cy="-2.793" rx="15" ry="5.953" fill="${color}" style="stroke-width:1"/>
      <path d="m-11.541-2.716-7-10v20z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <path d="m-2.875-7.774 5-10 5 10zm0 9.995 5 10 5-10z" fill="${color}" opacity=".6" style="stroke-width:1"/>
      <circle cx="13.625" cy="-4.053" r="1.26" fill="#000" style="stroke-width:1"/>
      <circle cx="13.94" cy="-4.368" r=".504" fill="#fff" style="stroke-width:1"/>
    </g>
  `,

  tetra: (color) => `
    <g>
      <circle cx="17.892" cy="-6.241" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="18.392" cy="-6.741" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="m-10.628-2.721 14.996-12 20 12-20 12z" fill="${color}" style="stroke-width:1"/>
      <path d="m-7.598-2.721-10.879-6.103 2.879 12.103z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <circle cx="15.992" cy="-5.969" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="16.492" cy="-6.469" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M23.173-2.626 19.658.259 16.3-5.185l4.796 1.847z" fill="${color}" style="stroke-width:1;transform-origin:19.7365px -2.463px" transform="scale(-1)"/>
    </g>
  `,

  // Language-specific shapes

  javascript: (color) => `
    <g>
      <path d="m-10.72-11.416-8-5v10z" fill="#000" opacity=".8" style="stroke-width:1"/>
      <ellipse cx="2.66" cy="-11.416" rx="16" ry="14" fill="${color}" style="stroke-width:1"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2" d="M2.66-25.416v-7m10 11 5-5m-5 25 5 5m-14.995-1-.01 7M-8.007-1.026l-4 5m4.055-25.891-4-5"/>
      <circle cx="12.66" cy="-14.416" r="2.5" fill="#000" style="stroke-width:1"/>
      <circle cx="13.16" cy="-14.916" r="1" fill="#fff" style="stroke-width:1"/>
      <path d="m3.876-1.249-4.202-3.72-.761 5.562z" fill="#000" opacity=".8" style="stroke-width:1;transform-origin:1.585px -1.719px"/>
      <path style="fill:none;stroke:#000;stroke-width:1" d="M14.648-17.455c-3.146-1.45-5.246-.45-5.821 3.144"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:8.58px -22.373px" d="m7.347-21.906 2.466-6.627"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:8.486px 5.278px" d="M9.719 5.745 7.253-.882"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:-2.93px -22.351px" d="m-1.697-21.884-2.466-6.627"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:-3.229px 5.241px" d="m-4.462 5.708 2.466-6.627"/>
    </g>
  `,

  typescript: (color) => `
    <g>
      <circle cx="19.924" cy="-8.125" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="20.424" cy="-8.625" r=".8" fill="#fff" style="stroke-width:1"/>
      <path fill="${color}" style="stroke-width:1" d="m24.705-4.661-12-11h-23v22h23z"/>
      <path fill="${color}" opacity=".9" style="stroke-width:1" d="m-8.536-4.661-9-7v14z"/>
      <path stroke="#fff" stroke-width=".8" style="stroke-width:.8" d="M-3.296-15.661v22m10-22v22"/>
      <circle cx="17.704" cy="-7.661" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="18.204" cy="-8.161" r=".8" fill="#fff" style="stroke-width:1"/>
      <path fill="${color}" style="stroke-width:1" d="M6.104 6.248.58 1.951v8.594z"/>
    </g>
  `,

  python: (color) => `
    <g>
        <path fill="${color}" d="M-1.55 1.627h34.278v7.555H-1.55z" style="stroke-width:1"/>
        <rect x="-1.079" y="-18.462" width="17.667" height="8.668" rx="3.175" ry="3.175" fill="${color}" style="stroke-width:1;transform-origin:2.771px -5.496px" transform="rotate(45 -19.557 -15.527)"/>
        <ellipse cx="21.281" cy="1.667" rx="11.447" ry="5.018" fill="${color}" style="stroke-width:1"/>
        <circle cx="27.446" cy="2.637" r="2.101" fill="#fff" style="stroke-width:1"/>
        <rect x="-1.079" y="-18.462" width="17.667" height="8.668" rx="3.175" ry="3.175" fill="${color}" style="stroke-width:1;transform-origin:10.848px -16.199px" transform="rotate(150 -15.07 6.672)"/>
        <rect x="13.994" y="-7.709" width="17.667" height="8.668" rx="3.175" ry="3.175" fill="${color}" style="stroke-width:1;transform-origin:13.935px -3.786px" transform="matrix(-1 0 0 -1 -27.87 7.572)"/>
        <rect x="-16.022" y="-9.2" width="17.667" height="8.668" rx="3.175" ry="3.175" fill="${color}" style="stroke-width:1;transform-origin:-16.081px -5.277px" transform="matrix(-1 0 0 -1 32.161 10.555)"/>
    </g>
  `,

  java: (color) => `
    <g>
      <path d="M-9.651-25.643s3.058 2.687 6.095 4.135c3.158 1.508 6.329 1.762 8.329.82 2.551-1.205 3.922 7.353 3.922 7.353 1.088-2.364.634-4.404.3-5.763-.312-1.31-1.18-2.235-2.165-2.666-1.107-.484-2.382-.377-4.092-.024-1.509.308-4.123-.183-6.105-1.554-2.406-1.652-6.284-2.301-6.284-2.301" fill="#fc4b1e" style="stroke-width:1;transform-origin:-112.166px 12.934px"/>
      <path d="M8.021-14.142s-1.985-4.994-5.072-5.303c-3.218-.323-6.494.448-8.598 1.89-2.689 1.843-3.799-5.159-3.799-5.159-1.219 2.391-.813 4.023-.526 5.098.275 1.04 1.152 1.573 2.156 1.64 1.125.077 2.455-.416 4.243-1.257 1.567-.739 4.252-1.13 6.264-.56 2.427.685 5.332 3.651 5.332 3.651" fill="#fc4b1e" style="stroke-width:1;transform-origin:-112.069px 12.185px"/>
      <circle cx="15.124" cy="-12.124" r="2.2" fill="#000" style="stroke-width:1"/>
      <circle cx="15.624" cy="-12.624" r=".9" fill="#fff" style="stroke-width:1"/>
      <path d="M-13.67-6.659c5.33-8.666 12.67-12 22-10 8.666 2 7.986 10 14.841 10 5.077 0-6.175 8-14.841 10-9.33 2-16.67-1.333-22-10" fill="${color}" style="stroke-width:1"/>
      <path d="m-10.79-6.659-10-7 3.27 6.837-3.27 7.163z" fill="${color}" style="stroke-width:1"/>
      <path d="M-5.26-12.539q2.355 3.528 0 5.88 2.355 2.352 0 5.88m4.32-13.026q3.18 3.969 0 7.146 3.18 3.177 0 7.146" stroke="#000" stroke-width=".8" opacity=".3" style="stroke-width:.8" fill="${color}"/>
      <circle cx="11.968" cy="-11.513" r="2.2" fill="#000" style="stroke-width:1"/>
      <circle cx="12.468" cy="-12.013" r=".9" fill="#fff" style="stroke-width:1"/>
      <path d="M7.667 3.389 3.133-.439l-.908 3.545L1.19 6.813z" fill="${color}" style="stroke-width:1;transform-origin:-107.038px 36.286px"/>
    </g>
  `,

  cpp: (color) => `
    <g>
      <path d="M28.871-3.415 5.269-.882l-7.222 4.693-22.58-2.71v-9.032l22.58-2.71 7.232 5.307z" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
      <path d="m37.317-3.415-10.872-8.451V5.036z" fill="${color}" style="stroke-width:1;transform-origin:31.881px -3.415px"/>
      <circle cx="-11.476" cy="-5.221" r="2.146" fill="#000" style="stroke-width:1" transform="scale(-1 1)"/>
      <circle cx="-11.025" cy="-5.673" r=".723" fill="#fff" style="stroke-width:1" transform="scale(-1 1)"/>
      <path d="m-10.033-2.437 6.264 11.644 6.863-.835 4.118-.5-10.492-6.05-.189-8.01" fill="${color}" opacity=".8" style="stroke-width:1;paint-order:fill;stroke-miterlimit:12.2;stroke-linejoin:bevel;transform-origin:-1.411px 1.509px" transform="matrix(0 -1.00001 .99999 0 0 0)"/>
      <path d="m-7.226-2.323-2.309-3.059 5.48-10.188 6.864.834 4.118.501-10.492 6.048-.189 8.012" fill="${color}" opacity=".8" style="stroke-width:1;paint-order:fill;stroke-miterlimit:12.2;stroke-linejoin:bevel;transform-origin:-1.304px -7.873px" transform="rotate(90)scale(1.00001 .99999)"/>
      <path d="m-9.115-3.907-2.102-4.688-2.028 4.935L-11.31.952z" fill="${color}" style="stroke-width:1;transform-origin:-5.834px .472px"/>
      <path d="m-16.809-3.629-2.102-4.689-2.028 4.936 1.935 4.61z" fill="${color}" style="stroke-width:1;transform-origin:-13.528px .75px"/>
    </g>
  `,

  csharp: (color) => `
    <g>
      <circle cx="21.711" cy="-3.597" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="22.211" cy="-4.097" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="m25.6.108-16-13-20 13 20 13z" fill="${color}" style="stroke-width:1"/>
      <path d="m-.437 5.153-4.767-3.177V8.33z" fill="${color}" opacity=".9" style="stroke-width:1;transform-origin:-2.821px 5.153px" transform="rotate(30)"/>
      <path d="m10.218-10.635-9-6v12z" fill="${color}" opacity=".9" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-30)"/>
      <path d="m-6.973.108-9-6v12z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <path d="M9.173-9.412-1.009 5.314" stroke="#fff" opacity=".3" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-15)"/>
      <circle cx="19.416" cy="-3.255" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="19.916" cy="-3.755" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="m13.859-9.182-10.58 15.3" stroke="#fff" opacity=".3" style="stroke-width:1;transform-origin:8.569px -1.532px" transform="rotate(-15)"/>
      <path d="M9.915-6.402.693 6.832" stroke="#fff" opacity=".3" style="stroke-width:1;transform-origin:5.304px .215px" transform="rotate(56.691)"/>
      <path d="M12.282-11.559 3.06 1.675" stroke="#fff" opacity=".3" style="stroke-width:1;transform-origin:7.671px -4.942px" transform="rotate(56.691)"/>
    </g>
  `,

  go: (color) => `
    <g>
      <rect x="-1.845" y="1.321" width="5.47" height="2.536" rx="4.931" ry="4.931" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%;fill:#e0cfbb" transform="rotate(120 2.882 5.07)"/>
      <rect x="-1.845" y="1.321" width="5.47" height="2.536" rx="4.931" ry="4.931" style="stroke-width:1;transform-origin:.89px 2.589px;fill:#e0cfbb" transform="rotate(120 1.585 3.861)"/>
      <rect x="-1.845" y="1.321" width="5.47" height="2.536" rx="4.931" ry="4.931" style="stroke-width:1;transform-origin:.89px 2.589px;fill:#e0cfbb" transform="rotate(120 -4.344 .863)"/>
      <rect x="-1.845" y="1.321" width="5.47" height="2.536" rx="4.931" ry="4.931" style="stroke-width:1;transform-origin:.89px 2.589px;fill:#e0cfbb" transform="rotate(120 -5.517 -.381)"/>
      <rect x="-1.845" y="1.321" width="5.47" height="2.536" rx="4.931" ry="4.931" style="stroke-width:1;transform-origin:.89px 2.589px" transform="rotate(120 8.396 -1.986)" fill="${color}"/>
      <rect x="-1.051" y=".753" width="3.117" height="1.445" rx="4.931" ry="4.931" style="stroke-width:1;transform-origin:.507px 1.475px" transform="rotate(120 8.403 -1.366)" fill="fff"/>
      <rect x="-13.502" y="-7.688" width="32.308" height="14.981" rx="4.931" ry="4.931" fill="${color}"/>
      <path style="fill:#fff;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(15 -3.926 -8.464)" d="M19.342 1.913h1.717v2.535h-1.717z"/>
      <path d="m-10.774.047-8-5v10z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <circle cx="14.772" cy="-1.697" r="2.5" fill="#fff" style="stroke-width:1"/>
      <circle cx="15.757" cy="-1.712" r="1" fill="#000" style="stroke-width:1"/>
      <circle cx="29.676" cy="10.981" r="1.759" transform="matrix(1.01753 0 0 .93684 -12.218 -7.743)" style="fill:#e0cfbb"/>
    </g>
  `,

  rust: (color) => `
    <g>
      <path style="fill:green;stroke:#025d02;stroke-width:1;transform-origin:-12.398px -.644px" d="m-9.294-6.408-1.415 9.349-2.386.293-3.761-9.075" transform="matrix(0 -1.00001 .99999 0 0 0)"/>
      <path style="fill:none;stroke:#025d02;stroke-width:1;transform-origin:-12.398px -.644px" d="m-9.441-4.627-3.434.13-3.018.517" transform="matrix(0 -1.00001 .99999 0 0 0)"/>
      <ellipse cx="-7.592" cy="-7.084" rx="1.61" ry="1.174" fill="#025d02" style="stroke-width:1;transform-origin:-7.649px -2.553px" transform="rotate(-97.037 -1.53 3.056)scale(1 -1)"/>
      <path style="fill:none;stroke:#025d02;stroke-width:1;transform-origin:-12.398px -.644px" d="m-13.16-6.218 1.396 9.142" transform="matrix(0 -1.00001 .99999 0 0 0)"/>
      <path d="M3.907-21.78c-.252 1.843-4.789-1.384-4.535-3.227l-.305 1.982c-.115 1.459 4.374 4.152 4.46 3.041z" style="stroke-width:1;transform-origin:1.487px -22.364px" fill="${color}" transform="scale(-1)"/>
      <path d="M4.24 4.899C3.945 2.745-1.356 6.515-1.059 8.67l-.357-2.316c-.135-1.705 5.112-4.853 5.213-3.556z" style="transform-origin:1.411px 5.582px" fill="${color}" transform="scale(-1)"/>
      <path d="M-3.25-9.247c.469-10.755 7.056-13.938 12.12-13.582 9.242 2.047 7.179 29.027-1.144 28.879C3.156 5.969-3.721 1.593-3.25-9.247" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
      <path style="fill:green;stroke:#025d02;transform-origin:-12.489px -16.461px" d="m-9.385-10.697-1.415-9.349-2.386-.293-3.762 9.075" transform="rotate(90)scale(1.00001 .99999)"/>
      <path style="fill:none;stroke:#025d02;transform-origin:-12.489px -16.461px" d="m-9.532-12.478-3.435-.13-3.016-.517" transform="rotate(90)scale(1.00001 .99999)"/>
      <ellipse cx="-7.592" cy="-7.084" rx="1.61" ry="1.174" fill="#025d02" style="transform-origin:-7.649px -2.553px" transform="rotate(97.037 3.729 -9.094)"/>
      <path style="fill:none;stroke:#025d02;transform-origin:-12.489px -16.461px" d="m-13.252-10.887 1.397-9.141" transform="rotate(90)scale(1.00001 .99999)"/>
      <circle cx="-.884" cy="12.445" r="2.32" fill="#000" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(0 1 -.99998 0 4.227 -17.515)"/>
      <circle cx="-.53" cy="12.091" r=".949" fill="#fff" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(0 1 -.99998 0 4.401 -16.633)"/>
      <circle cx="-5.359" cy="12.452" r="2.32" fill="#000" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(0 1 -.99998 0 8.692 -24.2)"/>
      <circle cx="-5.005" cy="12.098" r=".949" fill="#fff" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(0 1 -.99998 0 8.866 -23.318)"/>
      <path d="m17.462-10.23-3.578-2.745v5.491z" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%"/>
      <path d="m17.477-6.295-3.605-2.768v5.534z" fill="${color}" style="stroke-width:1;transform-origin:15.674px -6.295px"/>
      <path d="m-30.411 12.469 2.278 5.501 3.626-6.279z" fill="${color}" style="stroke-width:1;transform-origin:-7.027px 6.283px" transform="scale(-1)"/>
      <path d="m-1.372 29.349 5.902.778-3.624-6.279z" fill="${color}" style="stroke-width:1;transform-origin:7.492px 6.283px" transform="scale(-1)"/>
      <path d="m-35.807 4.857 2.278 5.502 3.624-6.278z" fill="${color}" style="stroke-width:1;transform-origin:-10.709px 4.318px" transform="scale(-1)"/>
      <path d="m8.315 29.281 2.279-5.501 3.624 6.278z" fill="${color}" style="stroke-width:1;transform-origin:11.354px 4.318px" transform="scale(-1)"/>
      <path d="m-36.276-6.496-.776 5.905 6.277-3.624z" fill="${color}" style="stroke-width:1;transform-origin:-13.34px .389px" transform="scale(-1)"/>
      <path d="m17.761 25.517-.777-5.904 6.278 3.624z" fill="${color}" style="stroke-width:1;transform-origin:13.86px .75px" transform="scale(-1)"/>
      <path d="M-35.363-27.365c-.777-.998.336-3.006 1.273-3.181.28-.054 1.679-.557 2.084-.538 2.222.11 2.074 1.352 2.331 2.175" fill="${color}" style="stroke-width:1;transform-origin:-17.468px -10.051px" transform="scale(-1)"/>
      <path d="M-30.203-28.94c-.749.962.323 2.899 1.226 3.067.272.053 1.619.538 2.011.519 2.142-.105 1.997-1.303 2.246-2.096" fill="${color}" style="stroke-width:1;transform-origin:-14.932px -10.048px" transform="scale(-1)"/>
      <path d="M28.979 6.018c-.826-1.062.358-3.195 1.351-3.382.299-.058 1.786-.592 2.216-.573 2.361.116 2.204 1.437 2.477 2.314" fill="${color}" style="stroke-width:1;transform-origin:14.981px -9.65px" transform="scale(-1)"/>
      <path d="M.444-27.642c-1.067-.832-3.218.361-3.405 1.363-.057.301-.597 1.799-.576 2.23.117 2.38 1.446 2.222 2.329 2.495" fill="${color}" style="stroke-width:1;transform-origin:-1.322px -25.4px" transform="rotate(90)scale(1.00001 .99999)"/>
      <path d="M-1.995-7.421c2.621.02.557 2.187-.247 1.905C-4.053-6.154-8.633-2.049-8.32.225l-.463-3.017c-.176-2.22 6.657-6.32 6.788-4.629" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" fill="${color}" transform="scale(-1)"/>
      <path d="M-2.024-9.546c2.623-.018.557-2.185-.246-1.904-1.81.638-6.392-3.468-6.078-5.743l-.462 3.019c-.177 2.22 6.655 6.321 6.786 4.628" style="stroke-width:1;transform-origin:-4.775px -13.17px" fill="${color}" transform="scale(-1)"/>
    </g>
  `,

  ruby: (color) => `
    <g>
      <path d="m16.295-11.268-20.21-17.325V6.056z" fill="${color}" style="stroke-width:1"/>
      <path d="m-2.387.011.232-23.746-8.483-4.883-1.673 1.899-.085 30.56 1.758 2.19z" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
      <path d="m-9.674-10.63-8.691-7.449V-3.18z" fill="${color}" style="stroke-width:1"/>
      <circle cx="3.402" cy="-13.218" r="3.208" fill="#000" style="stroke-width:1"/>
      <circle cx="4.205" cy="-14.019" r="1.283" fill="#fff" style="stroke-width:1"/>
    </g>
  `,

  php: (color) => `
    <g>
      <ellipse cx="9.532" cy="-3.129" rx="20" ry="7" fill="${color}" style="stroke-width:1"/>
      <path d="m-9.758-4.283-8.71-2.846v8l8.832-2.596z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <circle cx="21.532" cy="-5.129" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="22.032" cy="-5.629" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M28.335-4.988c1.209-.625 3.633 6.687 1.4 7.862-1.066 1.735-10.266 4.655-9.293 4.445-2.341-.251-3.506-3.323-1.165-3.072.92.832 4.817-.86 6.467-2.757s.578-4.15-.251-4.169z" fill="${color}"/>
      <ellipse cx="22.469" cy="-16.696" rx="6.276" ry="7" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%;fill:#495587" transform="rotate(90 -10.077 .438)"/>
    </g>
  `,

  swift: (color) => `
    <g>
      <circle cx="21.872" cy="-5.87" r="1.562" fill="#000" style="stroke-width:1"/>
      <circle cx="22.263" cy="-6.26" r=".625" fill="#fff" style="stroke-width:1"/>
      <path d="M-9.046-3.149q11.597-6.955 34.781-2.318-6.961 2.318 0 4.637Q2.551 3.807-9.046-3.149" fill="${color}" style="stroke-width:1"/>
      <path d="m-8.748-3.149-8.676-4.621L9.819-2.652-17.822.676z" fill="${color}" opacity=".85" style="stroke-width:1"/>
      <circle cx="20.213" cy="-5.63" r="1.562" fill="#000" style="stroke-width:1"/>
      <circle cx="20.604" cy="-6.021" r=".625" fill="#fff" style="stroke-width:1"/>
      <path d="M17.255-2.262C20.743-3.279 7.268-20.68 5.157-20.035l7.017 16.511L-2.33 8.425c3.673.758 23.26-9.928 19.585-10.687" fill="${color}" style="stroke-width:1;transform-origin:7.238px -6.118px"/>
    </g>
  `,

  kotlin: (color) => `
    <g>
      <path d="m-5.494-22.503 27.422.244.024 27.604-28.501.152 13.685-14z" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
      <path d="m-4.36-8.057-8-6-7.839 6 7.839 6z" fill="${color}" style="stroke-width:1"/>
      <circle cx="6.485" cy="-18.47" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="6.985" cy="-18.97" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="m8.483 4.536-8-6v12z" fill="${color}" style="stroke-width:1"/>
    </g>
  `,

  html: (color) => `
    <g>
      <circle cx="8.18" cy="-15.633" r="2.988" fill="#000" style="stroke-width:1"/>
      <circle cx="8.927" cy="-16.381" r="1.195" fill="#fff" style="stroke-width:1"/>
      <path d="m15.656-10.437-26.291-19.718-5.189 5.295L1.053-10.437-16.172 3.986l5.537 5.295z" fill="${color}"/>
      <path d="m5.913-10.521-7.88-5.909-7.72 5.909 7.72 5.91z" style="stroke-width:1" fill="${color}"/>
      <circle cx="5.769" cy="-14.841" r="2.988" fill="#000" style="stroke-width:1"/>
      <path d="m-6.807-10.547-7.88-5.909-7.72 5.909 7.72 5.909z" style="stroke-width:1" fill="${color}"/>
      <circle cx="6.516" cy="-15.589" r="1.195" fill="#fff" style="stroke-width:1"/>
    </g>
  `,

  css: (color) => `
    <g>
      <path d="m22.377-1.528-8.122-4.8.337 9.548z" fill="${color}" style="stroke-width:1"/>
      <ellipse cx="8.802" cy="-1.473" rx="9.413" ry="5.883" fill="${color}" style="stroke-width:1"/>
      <path d="M-36.488 4.55c24.81 6.058 35.92 3.6 37.375-6.356" fill="${color}" opacity=".6" style="stroke-width:1;transform-origin:-13.373px 3.728px"/>
      <path d="M-25.584-.628c8.961-8.778 17.729-8.597 27.748-.91" fill="${color}" opacity=".6" style="stroke-width:1;transform-origin:-11.285px -3.664px"/>
      <path d="M-5.856-9.794c6.045-8.537 23.199 4.039 19.97 4.447" fill="${color}" opacity=".6" style="stroke-width:1;transform-origin:-1.17px -11.656px"/>
      <circle cx="17.847" cy="-1.763" r="1.055" fill="#000" style="stroke-width:1"/>
      <circle cx="18.252" cy="-2.027" r=".422" fill="#fff" style="stroke-width:1"/>
      <path d="M1.371 7.293C5.89 9.138 13.602 5.908 12.818 2.608" fill="${color}" opacity=".6" style="stroke-width:1;transform-origin:9.228px 6.162px"/>
      <path d="M6.92 9.911c4.368.257 9.325-4.859 7.705-7.432" fill="${color}" opacity=".6" style="stroke-width:1;transform-origin:13.258px 6.676px" transform="rotate(-2.03)"/>
    </g>
  `,

  shell: (color) => `
    <g>
      <circle cx="8.354" cy="-4.962" fill="#64b033" r="7.518"/>
      <circle cx="-2.988" cy="-19.729" fill="${color}" r="17.616"/>
      <path d="M-10.706-3.869q-4.984-2.016 0-4.033L3.06-13.47q4.984-2.017 4.984 2.016v11.14q0 4.032-4.984 2.015Z" fill="${color}"/>
      <path d="m9.65-.47 2.707-.457C12.3 1.645 33.328 2.715 33.382.144c.548 3.83-22.93 4.957-23.732-.614m3.232-7.358 2.073.171c-.209-1.939 15.607-4.11 15.816-2.17.165-2.93-17.645-2.262-17.889 1.999" fill="#64b033"/>
      <path d="m9.905-2.127.073-1.6c.639.945 18.736 1.988 21.288.812C28.16.042 14.073-.589 9.905-2.127m.246-3.835 1.959-.702c.299 1.928 16.138-.069 15.838-1.997.918 2.787-16.458 6.751-17.797 2.699" fill="#64b033"/>
      <circle cx="11.497" cy="-4.812" r="2.044" fill="#000"/>
      <circle cx="12.008" cy="-5.323" r=".818" fill="#fff"/>
      <path d="m-14.295-27.449 9.022 6.316-8.571 6.654m9.839-.148 11.977-.037" fill="${color}" stroke="#000"/>
    </g>
  `,

  vue: (color) => `
    <g>
      <path d="m-5.58-14.713 5.019 3.315-1.293.712-.893.47-1.15.733-1.324.776z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.738px"/>
      <path d="m-3.241-15.363 5.02 3.314-1.293.712-.893.471-1.15.733-1.324.776z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <path d="m-.173-15.551 4.635 3.833-1.361.57-.938.371-1.223.606-1.399.63z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.738px"/>
      <path d="m2.222-15.948 4.636 3.833-1.361.569-.938.373-1.222.606-1.4.63z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.738px"/>
      <path d="m-7.289-2.771 4.636 3.833-1.361.568-.938.373-1.222.606-1.4.63z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <path d="m5.473-15.978 2.69 5.38-1.476-.03-1.009-.039-1.362.06-1.535.009z" fill="#34495e" style="stroke-width:1;transform-origin:-1.79px -5.738px"/>
      <path d="m7.824-15.371 2.69 5.38-1.475-.03-1.009-.039-1.362.06-1.535.009z" fill="#34495e" style="stroke-width:1;transform-origin:-1.79px -5.738px"/>
      <path d="m10.575-14.001 2.098 5.638-1.464-.187-.998-.148-1.361-.086-1.527-.155z" fill="#34495e" style="stroke-width:1;transform-origin:-1.79px -5.738px"/>
      <path d="m12.847-13.146 2.099 5.637-1.463-.188-1-.146-1.36-.086-1.528-.154z" fill="#34495e" style="stroke-width:1;transform-origin:-1.79px -5.738px"/>
      <ellipse cx="3.009" cy="-4.416" rx="12.862" ry="8.268" fill="${color}" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <path d="m-10.956-4-8.484-4.241.047 2.326L-15.195-4l-4.23 1.825-.015 2.417z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <circle cx="9.671" cy="-4.547" r="2.239" fill="#000" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <circle cx="10.231" cy="-5.107" r=".896" fill="#fff" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <path d="m-6.018-4.005-13.434-6.717.008 2.578 8.234 4.139-8.221 3.952-.021 2.765z" fill="${color}" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
      <path d="m.616 4.503 5.02-3.315L4.343.476 1.959 2.174l.34-2.901-1.324-.776z" fill="#34495e" style="stroke-width:1;transform-origin:-1.791px -5.737px"/>
    </g>
  `,

  dart: (color) => `
    <g>
      <circle cx="13.293" cy="-7.69" r="1.8" fill="#000" style="stroke-width:1"/>
      <circle cx="13.793" cy="-8.19" r=".7" fill="#fff" style="stroke-width:1"/>
      <path d="M30.39-6.316 14.295-8.025-2.61-10.316l-19.6 3.332c-.008-.021-.81-1.413.195 1.351L-2.61-2.316z" fill="${color}" style="stroke-width:1"/>
      <path d="m-21.61-5.809.081-.87-6.081-4.637v10z" fill="${color}" style="stroke-width:1"/>
      <circle cx="11.711" cy="-7.499" r="1.8" fill="#000" style="stroke-width:1"/>
      <circle cx="12.211" cy="-7.999" r=".7" fill="#fff" style="stroke-width:1"/>
      <path d="m5.286-3.315.045-.485-3.389-2.585v5.574zM-.261-9.443l.052-.561-3.921-2.99v6.448z" fill="${color}" style="stroke-width:1"/>
    </g>
  `,

  scala: (color) => `
    <g>
      <path fill="#751b26" transform="matrix(-1 0 -.29386 1 4.096 -32.56)" style="transform-origin:5.993px 26.337px" d="M-.256 14.195h12.497v24.284H-.256z"/>
      <path fill="#751b26" transform="matrix(-1 0 -.29386 1 -10.215 -32.567)" style="stroke-width:1;transform-origin:5.993px 26.337px" d="M-.256 14.195h12.497v24.284H-.256z"/>
      <path fill="${color}" transform="matrix(1 0 .29386 1 11.205 -32.604)" style="stroke-width:1;transform-origin:5.993px 26.337px" d="M-.256 14.195h12.497v24.284H-.256z"/>
      <path fill="${color}" transform="matrix(1 0 .29386 1 -3.05 -32.561)" style="stroke-width:1;transform-origin:5.993px 26.337px" d="M-.256 14.195h12.497v24.284H-.256z"/>
      <path fill="${color}" transform="matrix(1 0 .29386 1 -17.358 -32.567)" style="stroke-width:1;transform-origin:5.993px 26.337px" d="M-.256 14.195h12.497v24.284H-.256z"/>
      <path d="m-12.491-31.42 4.485 8.97h-8.97z" fill="${color}" transform="rotate(90 -9.426 .626)" style="transform-box:fill-box;transform-origin:50% 50%"/>
      <circle cx="22.182" cy="2.367" r="2.2" fill="#000" style="stroke-width:1"/>
      <circle cx="22.682" cy="1.867" r=".9" fill="#fff" style="stroke-width:1"/>
      <path d="m-12.491-31.42 4.485 8.97h-8.97z" fill="${color}" transform="rotate(90 -6.822 25.7)" style="stroke-width:1;transform-origin:-12.491px -26.935px"/>
    </g>
  `,

  haskell: (color) => `
    <g>
      <path d="M-7.965-3.648C.737-1.647 5.361 4.838 13.644 3.576c6.832-1.585 9.057-3.891 6.391-7.224q3.999-5-6-8-14-2-22 8" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
      <path d="M-4.981-4.596q-6-8-12-14v10l7 4-7 4v10q6-6 12-14" fill="${color}" style="stroke-width:1"/>
      <circle cx="13.71" cy="-2.432" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="14.21" cy="-2.932" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M.06 3.311q-1.452-4.739-3.242-8.548L-4.864-.574l2.592 3.044-3.938.689-1.682 4.663Q-4.086 6.033.06 3.311" fill="${color}" style="stroke-width:1;transform-origin:-2.738px 2.302px"/>
      <path d="M2.746 3.752Q1.294-.987-.496-4.796L-2.178-.133.414 2.911l-3.938.689-1.682 4.663q3.807-1.789 7.952-4.511" fill="${color}" style="stroke-width:1;transform-origin:-.052px 2.743px"/>
    </g>
  `,

  elixir: (color) => `
    <g>
      <path d="M-12.047-2.791C-2.061-1.432.077 4.454 8.429 5.378c7.713.298 10.172-5.425 9.449-9.68-.865-5.092-4.977-7.88-11.043-8.379-9.397-.774-13.549 3.223-18.882 9.89" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%"/>
      <circle cx="14.217" cy="-3.378" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="14.717" cy="-3.878" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M-.873-16.951 2.005-6.565h-5.756z" fill="${color}" style="stroke-width:1;transform-origin:-.872px -11.758px" opacity=".8" transform="rotate(90)"/>
      <path d="m-11.689-6.345 4.39 5.566h-8.779z" fill="${color}" style="stroke-width:1;transform-origin:-11.687px -3.562px" transform="rotate(90)"/>
      <path d="M2.953-4.023 5.831 6.363H.075z" fill="${color}" style="stroke-width:1;transform-origin:2.954px 1.17px" opacity=".8" transform="rotate(90)"/>
      <path d="m-18.029-4.871 2.057 7.224h-4.112z" fill="${color}" style="stroke-width:1;transform-origin:-18.027px -1.259px" transform="rotate(-90)"/>
    </g>
  `,

  clojure: (color) => `
    <g>
      <path d="M12.352-8.287c7.629.863 9.732 8.146 8.265 10.479H4.09c-2.768-3.189.7-11.335 8.262-10.479" fill="${color}" style="stroke-width:1;transform-origin:12.356px -3.048px" transform="rotate(90)"/>
      <path d="M7.096-10.529c1.94.165 2.799 1.709 2.03 2.573H5.067c-.68-.783.167-2.732 2.029-2.573" fill="${color}" style="stroke-width:1;transform-origin:7.097px -9.243px" transform="rotate(-90)"/>
      <path d="M7.003-7.114c1.94.165 2.799 1.709 2.03 2.573H4.974c-.68-.783.167-2.732 2.029-2.573" fill="${color}" style="stroke-width:1;transform-origin:7.004px -5.828px" transform="rotate(-90)"/>
      <path d="M7.003-4.347c1.94.165 2.799 1.709 2.03 2.573H4.974c-.68-.783.167-2.732 2.029-2.573" fill="${color}" style="stroke-width:1;transform-origin:7.004px -3.061px" transform="rotate(-90)"/>
      <path d="M6.772-.772c1.94.165 2.799 1.709 2.03 2.573H4.743c-.68-.783.167-2.732 2.029-2.573" fill="${color}" style="stroke-width:1;transform-origin:6.773px .514px" transform="rotate(-90)"/>
      <path d="M6.772 1.707c1.94.165 2.799 1.709 2.03 2.573H4.743c-.68-.783.167-2.732 2.029-2.573" fill="${color}" style="stroke-width:1;transform-origin:6.773px 2.993px" transform="rotate(-90)"/>
      <path d="M6.137-18.925c10.522.495 24.18-1.018 24.874 4.739-5.773-4.647-24.28-2.354-31.401-3.802-.202-.584-.122-.91-.13-1.175-.038-1.069 1.499-.005 6.657.238" fill="${color}" style="stroke-width:1;transform-origin:6.143px -13.686px" opacity=".8" transform="rotate(183.247)"/>
      <path d="M4.842 8.323c10.522-.495 24.18 1.018 24.874-4.739-5.773 4.647-24.28 2.354-31.401 3.802-.202.584-.122.91-.13 1.175-.038 1.069 1.499.005 6.657-.238" fill="${color}" style="stroke-width:1;transform-origin:4.848px 3.084px" opacity=".8" transform="scale(-1)"/>
      <path d="M4.398-7.41c-8.481-.433-19.319-2.725-20.33 1.839 4.998-3.272 19.665.028 25.493-.573.208-.452.169-.72.197-.932.116-.855-1.202-.122-5.36-.334" fill="${color}" style="stroke-width:1;transform-origin:3.98px -3.207px" opacity=".8"/>
      <path d="M2.138-3.052c-7.746-.113-17.265 1.144-19.196-2.591 5.334 2.91 18.174 1.051 23.693 1.852.29.376.313.589.386.761.294.697-1.085.034-4.883-.022" fill="${color}" style="stroke-width:1;transform-origin:.835px -6.463px" opacity=".8"/>
      <path d="M4.9.312C-2.846.425-12.365-.832-14.296 2.903-8.962-.007 3.878 1.852 9.397 1.051c.29-.376.313-.589.386-.761.294-.697-1.085-.034-4.883.022" fill="${color}" style="stroke-width:1;transform-origin:3.597px 3.723px" opacity=".8"/>
      <path d="M10.435-4.487C2.8-5.802-6.325-8.79-8.91-5.474c5.778-1.878 18.057 2.313 23.629 2.541.354-.316.416-.521.519-.677.418-.631-1.06-.233-4.803-.877" fill="${color}" style="stroke-width:1;transform-origin:8.526px -1.374px" opacity=".8" transform="rotate(-2.696)"/>
      <path d="M10.135 2.138C2.5 3.453-6.625 6.441-9.21 3.125-3.432 5.003 8.847.812 14.419.584c.354.316.416.521.519.677.418.631-1.06.233-4.803.877" fill="${color}" style="stroke-width:1;transform-origin:8.226px -.975px" opacity=".8" transform="rotate(2.696)"/>
    </g>
  `,

  lua: (color) => `
    <g>
      <circle cx="3.699" cy="-10.014" fill="${color}" r="16.691"/>
      <circle cx="11.439" cy="-17.908" fill="#fff" style="stroke-width:1" r="4.354"/>
      <circle cx="13.946" cy="-14.481" fill="#000" style="stroke-width:1" r="1.353"/>
      <circle cx="14.378" cy="-14.31" fill="#fff" style="stroke-width:1" r=".6"/>
      <path d="m-12.748-16.448 6.254 12.505H-19z" fill="${color}" style="transform-box:fill-box;transform-origin:50% 50%" transform="rotate(90)"/>
      <path d="m5.969-5.528 3.346 6.692H2.621z" fill="#fff" style="stroke-width:1;transform-origin:5.969px -2.182px" transform="rotate(90)"/>
    </g>
  `,

  r: (color) => `
    <g>
      <path d="M15.414-9.106C21.116 7.573-12.169 8.605-5.948-9.412" stroke="gray" stroke-width="2" style="stroke-width:2"/>
      <path d="M15.474-8.244c5.703-16.679-27.582-17.712-21.362.306" stroke="gray" stroke-width="2" style="stroke-width:2"/>
      <ellipse cx="4.4" cy="-8.636" rx="16.185" ry="7.455" fill="${color}" style="stroke-width:1"/>
      <path d="M-21.54-23.224c9.551 4.921 12.712 13.553 12.505 16.7-1.72 4.94-11.881 5.125-14.708 4.687 13.787-7.753 4.332-20.347 2.203-21.387" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-21.498)"/>
      <circle cx="15.534" cy="-8.964" r="1.787" fill="#000" style="stroke-width:1;transform-origin:15.534px -8.964px"/>
      <circle cx="15.941" cy="-9.37" r=".73" fill="#fff" style="stroke-width:1;transform-origin:15.534px -8.964px"/>
    </g>
  `,

  dockerfile: (color) => `
    <g>
      <path d="M8.458-.134C7.801 18.901-1.572 18.198-7.767 23.84l-.205-44.372C.836-21.006 9.07-17.864 8.458-.134" fill="${color}" style="stroke-width:1;transform-origin:5.004px .633px" transform="rotate(90)"/>
      <path d="M-18.239-7.785c4.187-2.203.12-8.854-1.081-8.686 1.734 6.333 1.075 8.64 1.081 8.686" fill="${color}" style="stroke-width:1;transform-origin:-16.53px -11.356px" transform="rotate(111.498)"/>
      <path d="M-20.82-12.005c6.241-3.558 1.327-11.47-.591-11.2-5.034 3.61.348 10.881.591 11.2" fill="${color}" style="stroke-width:1;transform-origin:-18.091px -17.708px" transform="rotate(201.498)"/>
      <path d="M-21.992-23.178c6.241 3.558 1.327 11.469-.591 11.199-5.034-3.609.348-10.88.591-11.199" fill="${color}" style="stroke-width:1;transform-origin:-19.263px -17.475px" transform="rotate(-70.938)"/>
      <circle cx="12.223" cy="-3.723" r="1.283" fill="#fff" style="stroke-width:1;transform-origin:12.223px -3.723px"/>
      <circle cx="12.226" cy="-3.725" r=".886" fill="#000" style="stroke-width:1;transform-origin:11.732px -3.233px"/>
      <path fill="${color}" d="M19.192-19.221H-7.011v8.147h26.203z"/>
      <path style="stroke-width:1" fill="${color}" transform="scale(-1 1)" d="M-6.438-26.143H7.023v8.458H-6.438z"/>
    </g>
  `,

  perl: (color) => `
    <g>
      <ellipse cx="5.41" cy="-8.161" rx="13.453" ry="8.368" fill="${color}" style="stroke-width:1"/>
      <path d="M-19.018-24.531C-8.298-19.007-4.75-9.318-4.982-5.787-6.913-.242-18.317-.034-21.49-.527c5.089-18.486 2.356-25.198 2.472-24.004" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-21.498)"/>
      <ellipse cx="12.667" cy="-7.18" rx="5.034" ry="3.13" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(17.892 -3.944 13.88)"/>
      <ellipse cx="12.667" cy="-7.18" rx="3.491" ry="1.434" fill="${color}" style="stroke-width:1;transform-origin:12.667px -7.18px" transform="rotate(32.55 -5.32 7.144)"/>
      <ellipse cx="12.667" cy="-7.18" rx="3.491" ry="1.434" fill="${color}" style="stroke-width:1;transform-origin:12.667px -7.18px" transform="rotate(67.901 4.04 -5.198)"/>
      <circle cx="6.834" cy="-11.35" r="2.006" fill="#000" style="stroke-width:1;transform-origin:6.834px -11.35px" transform="matrix(0 1 1 0 6.561 .684)"/>
      <circle cx="6.179" cy="-11.874" r=".819" fill="#fff" style="stroke-width:1;transform-origin:5.723px -11.419px" transform="matrix(0 1 1 0 8.722 .067)"/>
      <ellipse cx="12.667" cy="-7.18" rx="5.427" ry="5.289" fill="${color}" style="stroke-width:1;transform-origin:12.667px -7.18px" transform="rotate(92.66 -3.853 -9.527)skewX(.617)"/>
    </g>
    `,

  matlab: (color) => `
    <g>
      <path d="M-11.51-23.253C1.738-24.311 15.593-10.499 13.803-4.352 11.605 1.958-10.078 9.15-13.689 8.589c23.07-11.426 2.172-33.132 2.179-31.842" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(1.06)"/>
      <circle cx="6.834" cy="-11.35" r="2.283" fill="#000" style="stroke-width:1;transform-origin:6.834px -11.35px" transform="matrix(0 1 1 0 .496 3.314)"/>
      <circle cx="6.179" cy="-11.874" r=".932" fill="#fff" style="stroke-width:1;transform-origin:5.66px -11.356px" transform="matrix(0 1 1 0 2.865 2.54)"/>
      <path d="m-5.789 9.611 3.556 6.384h-7.113z" fill="${color}" transform="rotate(91.12 10.113 -8.698)" style="transform-box:fill-box;transform-origin:50% 50%"/>
    </g>
    `,

  erlang: (color) => `
    <g>
      <path d="M-26.995-3.623C-7.556-8.093 2.179-18.398 20.683-15.58 35.945-12.038.494 1.453-26.995-3.623" fill="${color}" style="stroke-width:1;transform-origin:-1.318px -9.278px" transform="rotate(17.128)"/>
      <path d="M28.038-5.498c1.51-4.753-1.008-6.311-3.04-8.018l-1.579 4.374-1.26 3.502-1.578 4.372c3.124.562 5.839-.332 7.457-4.23" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(251.012)"/>
      <path d="M-22.223-9.355c1.57-4.942-4.729-7.405-6.842-9.178l.558 4.969c.241 1.037.681 4.09-1.35 5.446l-3.211 1.873c2.741.391 8.508 2.04 12.22-1.238" fill="${color}" style="stroke-width:1;transform-origin:-26.432px -10.757px" transform="rotate(-20.984)"/>
      <path d="M27.573-5.167c1.594 5.021-1.066 6.666-3.209 8.471L23.109-.634c.883-.405 2.391.06 1.292-3.679-1.011-2.752-2.247-1.708-3.026-1.501l-1.352-3.46c3.301-.593 5.844-.007 7.55 4.107" fill="${color}" style="stroke-width:1;transform-origin:23.88px -3.248px" transform="rotate(123.133)"/>
      <circle cx="21.023" cy="-6.023" r="1.504" fill="#000" style="stroke-width:1"/>
      <circle cx="21.399" cy="-6.398" r=".6" fill="#fff" style="stroke-width:1"/>
      <path d="M11.464-.894c1-3.15-.666-4.181-2.012-5.312l-1.046 2.9L7.57-.989 6.526 1.907c2.069.371 3.867-.22 4.938-2.801" fill="${color}" style="stroke-width:1;transform-origin:9.147px -2.098px" transform="rotate(23.437)"/>
      <path d="M-3.372-5.39c2.86-3.15-1.905-4.181-5.753-5.313l-2.993 2.899-2.387 2.318-2.988 2.895c5.915.371 11.057-.219 14.121-2.799" fill="${color}" style="stroke-width:1;transform-origin:-9.997px -6.596px" transform="rotate(22.064)"/>
    </g>
    `,
  julia: (color) => `
    <g>
      <path d="M-.269-30.117 4.428-.911c2.491 3.241.436-1.931-12.081-11.184-.296-11.887 1.333-13.512 7.384-18.022" fill="${color}" style="stroke-width:1;transform-origin:-.264px -13.086px" opacity=".7" transform="rotate(93.097)"/>
      <path d="M27.497-14.499c-11.282 2.641-44.998 21.746-57.226.361" fill="${color}" style="stroke-width:1;transform-origin:-1.477px -8.938px" transform="scale(-1)"/>
      <path d="M27.108-.35C9.716-1.358-34.823-8.109-28.046-.47" fill="${color}" style="stroke-width:1;transform-origin:-.816px -2.207px" transform="rotate(179.345)"/>
      <circle cx="20.806" cy="-4.895" r="2.183" fill="#000" style="stroke-width:1;transform-origin:20.806px -4.895px"/>
      <circle cx="21.351" cy="-5.44" r=".872" fill="#fff" style="stroke-width:1;transform-origin:20.806px -4.895px"/>
      <path d="m51.183-124.51 5.016 24.732H46.167z" fill="${color}" transform="rotate(90.032 -88.038 17.858)" style="stroke-width:1;transform-origin:51.184px -112.144px"/>
      <path d="m6.524-4.043 2.151 7.319H4.374z" fill="${color}" style="stroke-width:1;transform-origin:6.526px -.383px" transform="rotate(229.866)"/>
    </g>
    `,
  jupyter: (color) => `
    <g>
      <circle cx="17.634" cy="-14.334" r="2.196" fill="#000" style="stroke-width:1;transform-origin:17.634px -14.334px"/>
      <circle cx="18.182" cy="-14.882" r=".877" fill="#fff" style="stroke-width:1;transform-origin:17.634px -14.334px"/>
      <path d="M-28.421-24.216c1.713 4.024 11.836 4.711 13.779-.024.347 7.12-13.522 7.83-13.779.024" fill="${color}" style="stroke-width:1;transform-origin:-21.527px -21.433px" transform="rotate(-19.203)"/>
      <path d="M-20.97-21.195c5.46 12.85 37.793 15.044 43.998-.077 1.097 22.732-43.179 24.999-43.998.077" fill="${color}"/>
      <circle cx="-.092" cy="-2.954" r="2.196" fill="gray"/>
      <path d="M-1.736-5.515c1.712 4.026 11.838 4.713 13.781-.024.344 7.12-13.523 7.83-13.781.024" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-25.234)"/>
      <circle cx="5.024" cy="1.115" r="2.196" fill="gray" style="stroke-width:1"/>
      <path d="M2.747-4.13C4.461-.106 14.585.583 16.528-4.154c.345 7.119-13.522 7.83-13.781.024" fill="${color}" style="stroke-width:1;transform-origin:9.64px -1.349px" transform="rotate(-55.218)"/>
      <circle cx="16.279" cy="-13.012" r="2.196" fill="#000" style="stroke-width:1;transform-origin:16.279px -13.012px"/>
      <circle cx="16.827" cy="-13.561" r=".877" fill="#fff" style="stroke-width:1;transform-origin:16.279px -13.012px"/>
    </g>
    `,
    vim: (color) => `
    <g>
      <path fill="${color}" transform="rotate(45 35.276 -40.341)" style="transform-box:fill-box;transform-origin:50% 50%" d="M12.078 11.565H35.76v23.682H12.078z"/>
      <path fill="${color}" transform="rotate(45 16.436 -46.664)" style="stroke-width:1;transform-origin:11.985px 11.728px" d="M6.052 5.795h11.866v11.866H6.052z"/>
      <circle cx="12.682" cy="-14.738" r="2.713" fill="#000" style="stroke-width:1;transform-origin:12.682px -14.738px"/>
      <circle cx="13.359" cy="-15.416" r="1.084" fill="#fff" style="stroke-width:1;transform-origin:12.682px -14.738px"/>
      <path d="m-.356-5.548 2.674 9.096h-5.346z" fill="${color}" style="stroke-width:1;transform-origin:-.353px -1px" transform="rotate(249.338)"/>
      <path d="M-.915-8.567 1.758.53h-5.346z" fill="${color}" style="stroke-width:1;transform-origin:-.912px -4.018px" transform="rotate(249.338)"/>
    </g>
    `,
    c: (color) => `
    <g>
      <path d="m19.964-9.047 1.49 2.533-7.222 4.693-22.58-2.71v-9.032l22.58-2.71 7.232 5.307z" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
      <path d="m38.73-9.047-19.692-8.451V-.596z" fill="${color}" style="stroke-width:1;transform-origin:24.474px -9.047px"/>
      <circle cx="-4.069" cy="-10.853" r="2.146" fill="#000" style="stroke-width:1" transform="scale(-1 1)"/>
      <circle cx="-3.618" cy="-11.305" r=".723" fill="#fff" style="stroke-width:1" transform="scale(-1 1)"/>
      <path d="m-17.44-8.069 6.264 11.644 6.863-.835 4.118-.5-10.492-6.05-.189-8.01" fill="${color}" opacity=".8" style="stroke-width:1;paint-order:fill;stroke-miterlimit:12.2;stroke-linejoin:bevel;transform-origin:-8.818px -4.123px" transform="rotate(-90)"/>
      <path d="m-16.942-11.014 5.48-10.188 6.864.834 4.118.501-10.492 6.048-.189 8.012" fill="${color}" opacity=".8" style="stroke-width:1;paint-order:fill;stroke-miterlimit:12.2;stroke-linejoin:bevel;transform-origin:-8.711px -13.505px" transform="rotate(90)"/>
    </g>
    `,
    tex: (color) => `
    <g>
      <path d="M-.226-21.367c10.87-5.689 20.653 19.729 9.413 30.252C4.029-2.973-5.252 6.973-8.439 11.065-9.598-3.933-19.838-11.106-.226-21.367" fill="${color}" style="stroke-width:1;transform-origin:1.968px -10.704px" transform="rotate(93.097)"/>
      <circle cx="5.703" cy="-11.935" r="2.658" fill="#000" style="stroke-width:1"/>
      <circle cx="6.262" cy="-12.495" r=".896" fill="#fff" style="stroke-width:1"/>
      <path d="M2.96-2.185s-4.644-1.683-6.579-.631c-1.932 1.051-.362 5.922-3.044 5.853C-3.774 5.995 5.847.773 2.96-2.185" fill="${color}" style="stroke-width:1;transform-origin:-7.067px -2.185px" transform="rotate(-13.228)"/>
    </g>
    `,
    nix: (color) => `
    <g>
      <path d="M27.335-14.016c-.117-.324 2.159.385 2.736-.613.296-.511 2.438 14.025 3.114 16.248.171.56-1.497 1.08-1.837.536-.413-.665.27-4.439-4.013-16.171" fill="${color}" style="stroke-width:1;transform-origin:28.441px -9.467px" transform="rotate(102.879)"/>
      <path d="M-5.318-2.479c29.755 8.574 40.175-2.01 8.674-9.712-31.499-7.701-33.681 2.505-8.674 9.712" fill="${color}" style="stroke-width:1;transform-origin:-3.953px -12.2px" transform="rotate(-12.879)"/>
      <circle cx="16.487" cy="-8.235" r="2.77" fill="#000" style="stroke-width:1"/>
      <circle cx="17.069" cy="-8.819" r=".934" fill="#fff" style="stroke-width:1"/>
      <path d="M-21.559-13.057c4.816-.902 6.032 12.147 5.057 14.932-3.291-3.312-7.697-.788-8.952.449-1.275-9.06 1.364-14.907 3.895-15.381" fill="${color}" style="stroke-width:1;transform-origin:-20.517px -8px" transform="rotate(93.097)"/>
      <path d="M-5.564-5.806C-2.542-7.754.178-17.387-.685-19.737c-2.918 2.791-6.819.664-7.931-.38-.278 6.942 1.897 15.056 3.052 14.311" fill="${color}" style="stroke-width:1;transform-origin:-4.242px -11.414px" transform="rotate(-56.004)"/>
    </g>
    `,
    assembly: (color) => `
    <g>
      <path d="m4.857-26.913 11.725 6.769v13.54L4.857.166l-11.726-6.77v-13.54z" fill="${color}" style="transform-box:fill-box;transform-origin:50% 50%" transform="rotate(90)"/>
      <path d="m-16.027-28.512 5.862 11.622v6.769l-5.862 3.384-5.863-3.384v-6.769z" fill="${color}" style="stroke-width:1;transform-origin:-16.027px -13.506px" transform="rotate(90)"/>
      <circle cx="10.829" cy="-13.484" r="3.059" fill="#000" style="stroke-width:1"/>
      <circle cx="11.472" cy="-14.129" r="1.031" fill="#fff" style="stroke-width:1"/>
      <path d="m4.686-11.189 4.667 5.288H.018z" fill="${color}" style="stroke-width:1;transform-origin:4.686px -4.362px" transform="rotate(183.788)"/>
    </g>
    `
};

const LANGUAGE_COLORS = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#F05138',
  'Kotlin': '#A97BFF',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Shell': '#89e051',
  'Vue': '#41b883',
  'Dart': '#00B4AB',
  'R': '#198CE7',
  'MATLAB': '#e16737',
  'Lua': '#000080',
  'Perl': '#0298c3',
  'Scala': '#c22d40',
  'Haskell': '#5e5086',
  'Elixir': '#6e4a7e',
  'Clojure': '#db5855',
  'Erlang': '#B83998',
  'Julia': '#a270ba',
  'Dockerfile': '#384d54',
  'Jupyter Notebook': '#DA5B0B',
  'Vim Script': '#199f4b',
  'C': '#555555',
  'TeX': '#3D6117',
  'Nix': '#7e7eff',
  'Assembly': '#6E4C13'
};

const LANGUAGE_SHAPES = {
  'JavaScript':  'javascript',
  'TypeScript':  'typescript',
  'Python':      'python',
  'Java':        'java',
  'C++':         'cpp',
  'C#':          'csharp',
  'Go':          'go',
  'Rust':        'rust',
  'Ruby':        'ruby',
  'PHP':         'php',
  'Swift':       'swift',
  'Kotlin':      'kotlin',
  'HTML':        'html',
  'CSS':         'css',
  'Shell':       'shell',
  'Vue':         'vue',
  'Dart':        'dart',
  'Scala':       'scala',
  'Haskell':     'haskell',
  'Elixir':      'elixir',
  'Clojure':     'clojure',
  'Lua':         'lua',
  'R':           'r',
  'Dockerfile':  'dockerfile',
  'Perl':        'perl',
  'MATLAB':      'matlab',
  'Erlang':      'erlang',
  'Julia':       'julia',
  'Jupyter Notebook': 'jupyter',
  'Vim Script': 'vim',
  'C': 'c',
  'TeX': 'tex',
  'Nix': 'nix',
  'Assembly': 'assembly'
};

const DEFAULT_SHAPES = ['default', 'round', 'long', 'angel', 'tetra'];

function getLanguageColor(language) {
  return LANGUAGE_COLORS[language] || '#8b8b8b';
}

function getFishShape(shapeName, color) {
  const shape = FISH_SHAPES[shapeName] || FISH_SHAPES.default;
  return shape(color);
}

function resolveShapeForLanguage(language, shapePreference = {}, index = 0) {
  if (shapePreference[language]) return shapePreference[language];
  if (LANGUAGE_SHAPES[language]) return LANGUAGE_SHAPES[language];
  return DEFAULT_SHAPES[index % DEFAULT_SHAPES.length];
}

module.exports = {
  FISH_SHAPES,
  LANGUAGE_COLORS,
  LANGUAGE_SHAPES,
  DEFAULT_SHAPES,
  getLanguageColor,
  getFishShape,
  resolveShapeForLanguage,
};
