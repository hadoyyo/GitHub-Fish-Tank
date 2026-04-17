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
      <path d="m-10.778-.387-8-5v10z" fill="#000" opacity=".8" style="stroke-width:1"/>
      <ellipse cx="2.602" cy="-.387" rx="16" ry="14" fill="${color}" style="stroke-width:1"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2" d="M2.602-14.387v-7m10 11 5-5m-5 25 5 5m-14.995-1-.01 7m-10.662-10.61-4 5m4.055-25.891-4-5"/>
      <circle cx="12.602" cy="-3.387" r="2.5" fill="#000" style="stroke-width:1"/>
      <circle cx="13.102" cy="-3.887" r="1" fill="#fff" style="stroke-width:1"/>
      <path d="M3.818 9.78-.384 6.06l-.761 5.562z" fill="#000" opacity=".8" style="stroke-width:1;transform-origin:1.527px 9.31px"/>
      <path style="fill:none;stroke:#000" d="M14.59-6.426c-3.146-1.45-5.246-.45-5.821 3.144"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-24.585)" d="m6.022-11.691 5-5"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:8.428px 13.46px" transform="rotate(204.585)" d="m5.928 10.96 5 5"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:-2.988px -14.169px" transform="rotate(204.585)" d="m-5.488-16.669 5 5"/>
      <path stroke="${color}" stroke-width="2" stroke-linecap="round" style="stroke-width:2;transform-origin:-3.287px 13.423px" transform="rotate(-24.585)" d="m-5.787 15.923 5-5"/>
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
      <path d="M-8.717-15.243s3.522 2.045 6.778 2.878c3.389.868 6.553.504 8.326-.807 2.271-1.676 5.278 6.455 5.278 6.455.608-2.53-.234-4.444-.818-5.712-.561-1.225-1.6-1.965-2.65-2.197-1.171-.261-2.405.091-4.018.768-1.417.594-4.072.618-6.291-.343-2.674-1.156-6.605-1.042-6.605-1.042" fill="#fc4b1e" style="transform-origin:1.579px -10.982px" transform="rotate(11.156)"/>
      <path d="M11.198-7.854s-3.132-4.362-6.205-3.91c-3.199.469-6.192 2.014-7.878 3.924-2.16 2.442-4.946-4.08-4.946-4.08-.592 2.616.19 4.1.733 5.073.524.942 1.501 1.245 2.491 1.066 1.106-.199 2.275-1 3.805-2.251 1.344-1.098 3.854-2.13 5.946-2.067 2.521.074 6.054 2.245 6.054 2.245" fill="#fc4b1e" style="stroke-width:1;transform-origin:1.676px -11.731px" transform="rotate(14.077)"/>
      <circle cx="17.076" cy="-3.636" r="2.2" fill="#000" style="stroke-width:1"/>
      <circle cx="17.576" cy="-4.136" r=".9" fill="#fff" style="stroke-width:1"/>
      <path d="M-11.719 1.829q8-13 22-10c8.667 2 7.987 10 14.842 10 5.077 0-6.175 8-14.842 10q-14 3-22-10" fill="${color}" style="stroke-width:1"/>
      <path d="m-8.835 1.829-10-7 3.266 6.837-3.266 7.163z" fill="${color}" style="stroke-width:1"/>
      <path d="M-3.307-4.051q2.352 3.528 0 5.88 2.352 2.352 0 5.88M1.015-5.317q3.177 3.969 0 7.146 3.177 3.177 0 7.146" stroke="#000" stroke-width=".8" opacity=".3" style="stroke-width:.8"/>
      <circle cx="13.92" cy="-3.025" r="2.2" fill="#000" style="stroke-width:1"/>
      <circle cx="14.42" cy="-3.525" r=".9" fill="#fff" style="stroke-width:1"/>
      <path d="M9.388 11.14 4.026 8.616l.034 3.659-.034 3.849z" fill="${color}" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(15)"/>
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
      <path d="m15.753-2.97-20.21-17.325v34.649z" fill="${color}" style="stroke-width:1"/>
      <path d="m-4.687 8.309.232-23.746-8.483-4.883-1.673 1.899-.085 30.56 1.758 2.19z" fill="${color}" style="stroke-width:1" transform="matrix(-1 0 0 -1 -17.393 -5.991)"/>
      <path d="m-10.216-2.332-8.691-7.449V5.118z" fill="${color}" style="stroke-width:1"/>
      <circle cx="2.86" cy="-4.92" r="3.208" fill="#000" style="stroke-width:1"/>
      <circle cx="3.663" cy="-5.721" r="1.283" fill="#fff" style="stroke-width:1"/>
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
      <path d="M-20,0 Q-10,-8 0,-3 Q10,3 20,-3 Q30,-8 38,0 Q30,6 20,3 Q10,-3 0,3 Q-10,8 -20,0 Z" fill="${color}" />
      <path d="M-20,0 L-28,-4 L-28,4 Z" fill="${color}" opacity="0.8" />
      <circle cx="32" cy="-2" r="2" fill="#000" />
      <circle cx="32.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  vue: (color) => `
    <g>
      <ellipse cx="8" cy="0" rx="14" ry="9" fill="${color}" />
      <path d="M-6,0 L-15,-12 L-10,0 L-15,12 Z" fill="${color}" opacity="0.85" />
      <path d="M-6,0 L-18,-6 L-13,0 L-18,6 Z" fill="${color}" opacity="0.55" />
      <circle cx="17" cy="-2" r="2" fill="#000" />
      <circle cx="17.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  dart: (color) => `
    <g>
      <path d="M38,0 L5,-4 L-14,-2 L-14,2 L5,4 Z" fill="${color}" />
      <path d="M-14,0 L-20,-5 L-20,5 Z" fill="${color}" opacity="0.8" />
      <circle cx="33" cy="-1" r="1.8" fill="#000" />
      <circle cx="33.5" cy="-1.5" r="0.7" fill="#fff" />
    </g>
  `,

  scala: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="16" ry="10" fill="${color}" />
      <path d="M-6,0 L-14,-5 L-14,5 Z" fill="${color}" opacity="0.8" />
      <line x1="2" y1="-10" x2="-2" y2="-20" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="-10" x2="6" y2="-21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="14" y1="-10" x2="14" y2="-21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="20" y1="-8" x2="22" y2="-18" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="4" y1="10" x2="2" y2="18" stroke="${color}" stroke-width="1.8" stroke-linecap="round" opacity="0.6" />
      <line x1="12" y1="10" x2="12" y2="19" stroke="${color}" stroke-width="1.8" stroke-linecap="round" opacity="0.6" />
      <circle cx="20" cy="-2" r="2.2" fill="#000" />
      <circle cx="20.5" cy="-2.5" r="0.9" fill="#fff" />
    </g>
  `,

  haskell: (color) => `
    <g>
      <path d="M0,0 Q8,-10 22,-8 Q32,-5 28,0 Q32,5 22,8 Q8,10 0,0 Z" fill="${color}" />
      <path d="M0,0 Q-6,-8 -12,-14 L-12,-4 L-5,0 L-12,4 L-12,14 Q-6,8 0,0 Z" fill="${color}" opacity="0.8" />
      <circle cx="24" cy="-2" r="2" fill="#000" />
      <circle cx="24.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  elixir: (color) => `
    <g>
      <path d="M0,0 Q4,-14 16,-14 Q28,-14 28,0 Q28,10 16,12 Q4,10 0,0 Z" fill="${color}" />
      <line x1="8" y1="12" x2="5" y2="22" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
      <line x1="14" y1="12" x2="13" y2="24" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
      <line x1="20" y1="11" x2="21" y2="22" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
      <circle cx="20" cy="-6" r="2.2" fill="#000" />
      <circle cx="20.5" cy="-6.5" r="0.9" fill="#fff" />
    </g>
  `,

  clojure: (color) => `
    <g>
      <circle cx="8" cy="0" r="14" fill="${color}" />
      <path d="M-6,0 L-14,-5 L-14,5 Z" fill="${color}" opacity="0.8" />
      <circle cx="8" cy="0" r="8" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.25" />
      <circle cx="16" cy="-4" r="2.5" fill="#000" />
      <circle cx="16.5" cy="-4.5" r="1" fill="#fff" />
    </g>
  `,

  lua: (color) => `
    <g>
      <ellipse cx="8" cy="0" rx="12" ry="17" fill="${color}" />
      <path d="M-4,0 L-10,-4 L-10,4 Z" fill="${color}" opacity="0.8" />
      <path d="M8,-17 L14,-24 L14,-17 Z" fill="${color}" opacity="0.6" />
      <path d="M8,17 L14,24 L14,17 Z" fill="${color}" opacity="0.6" />
      <circle cx="14" cy="-5" r="2.2" fill="#000" />
      <circle cx="14.5" cy="-5.5" r="0.9" fill="#fff" />
    </g>
  `,

  r: (color) => `
    <g>
      <path d="M14,-14 Q22,-10 20,0 Q22,10 14,14 Q6,12 4,4 Q0,8 -6,8 Q-2,0 4,-4 Q6,-12 14,-14 Z" fill="${color}" />
      <path d="M4,4 Q0,8 -6,8" stroke="${color}" stroke-width="2" fill="none" />
      <circle cx="18" cy="-8" r="2.2" fill="#000" />
      <circle cx="18.5" cy="-8.5" r="0.9" fill="#fff" />
    </g>
  `,

  dockerfile: (color) => `
    <g>
      <rect x="-10" y="-10" width="36" height="20" fill="${color}" rx="3" />
      <path d="M-10,0 L-18,-6 L-18,6 Z" fill="${color}" opacity="0.8" />
      <rect x="-4" y="-6" width="5" height="12" fill="#fff" opacity="0.15" rx="1" />
      <rect x="4" y="-6" width="5" height="12" fill="#fff" opacity="0.15" rx="1" />
      <rect x="12" y="-6" width="5" height="12" fill="#fff" opacity="0.15" rx="1" />
      <circle cx="20" cy="-3" r="2" fill="#000" />
      <circle cx="20.5" cy="-3.5" r="0.8" fill="#fff" />
    </g>
  `,
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
  'Dockerfile': '#384d54'
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
