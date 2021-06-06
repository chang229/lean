// 服务端渲染入口
import { createApp } from './app'

export default context => {
  const { app } = createApp()
  return app
}  