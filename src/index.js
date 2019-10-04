import {decode} from 'base62.io'
import {get} from 'axios'

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
  let pageContents = await get(`./pages/${decode(page)}`)

  const marked = await import('marked')
  
  pageContents = marked(pageContents.data)
  document.getElementById('app').innerHTML = pageContents
})()

