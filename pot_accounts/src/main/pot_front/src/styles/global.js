import './font.css';
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
textarea,
p,
blockquote,
th,
td,
input,
select,
button,
section,
article,
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

fieldset,
img {
    border: 0 none;
}

dl,
ul,
ol,
menu,
li {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote {
    &:before,
    &:after {
        content: '';
        content: none;
    }
}

q {
    &:before,
    &:after {
        content: '';
        content: none;
    }
}

input,
select,
textarea {
    font-size: 100%;
    vertical-align: middle;
}

button {
    font-size: 100%;
    vertical-align: middle;
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

body {
    -webkit-text-size-adjust: none;
}

input {
    &[type='text'],
    &[type='password'],
    &[type='submit'],
    &[type='search'] {
        -webkit-appearance: none;
        border-radius: 0;
    }

    &:checked[type='checkbox'] {
        background-color: #fff;
        -webkit-appearance: checkbox;
    }
}

button {
    -webkit-appearance: button;
    border-radius: 0;
}

input {
    &[type='button'],
    &[type='submit'],
    &[type='reset'],
    &[type='file'] {
        -webkit-appearance: button;
        border-radius: 0;
    }

    &[type='search']::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
}

body,
button,
select,
td,
textarea,
th {
    line-height: 1.5;
    font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', sans-serif;
    font-weight: 400;
    letter-spacing: -0.04rem;
    color: #222222;
}

input {
    font-size: 16px;
}
a {
    color: #222222;
    text-decoration: none;
    &:active,
    &:hover {
        text-decoration: none;
    }
}
address,
caption,
cite,
code,
dfn,
em,
var {
    font-style: normal;
    font-weight: normal;
}

hr {
    display: none;
}

input[type='password'] {
    font-family: 'verdana';
}

.blind,
caption,
legend {
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
}

`

export default GlobalStyle;