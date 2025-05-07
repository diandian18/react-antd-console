const UA = window.navigator.userAgent;

/** 小程序算作移动端 */
export const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|miniProgram)/i.test(UA);
