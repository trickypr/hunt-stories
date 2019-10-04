import {decode, encode} from 'base62.io'
import {get} from 'axios'

import './index.scss'

// * Everything in URL is base62 encoded

const getQueryParam = param => {
  const url = location.href
  const name = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]")
  const regexS = "[\\?&]"+name+"=([^&#]*)"
  const regex = new RegExp( regexS )
  const results = regex.exec( url )
  return results == null ? null : results[1]
}

const page = getQueryParam('23b4tx')

;(async () => {
  const pageURL = `./pages/${decode(page)}`
  let pageContents = await get(pageURL)

  const marked = await import('marked')
  
  pageContents = marked(pageContents.data)
  document.getElementById('app').innerHTML = pageContents

  const title = `The Hunt | ${document.getElementsByTagName('h1')[0].innerText}`
  document.getElementsByTagName('title')[0].innerText = title
})()

