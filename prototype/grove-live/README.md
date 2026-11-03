# 归因林 · Attribution Grove（真实记录版）

> 在线 · Live: http://8.148.233.53/grove/
> 本地 · Local: 用浏览器打开 `index.html`；首次需输入参与者代号（建档），记录经后端存到研究服务器。
> Live: http://8.148.233.53/grove/ — Local: open `index.html`; first run asks for a participant code, records are saved to the research server.

与 `prototype/forest/`（概念演示，含种子数据、纯本地）的区别 · Differences from `prototype/forest/` (concept demo, seed data, local-only):

| 维度 · Aspect | forest（演示） | grove-live（真实） |
|---|---|---|
| 数据 · Data | localStorage + 种子数据 | 研究服务器 SQLite，按参与者代号归类 |
| 身体部位排序 · Body order | 出现频率 | 人体结构自上而下（头部→颈部→肩→…→足部） |
| 温湿度 · Temp/Humidity | 无 | 触发·环境轴新增「温度 / 湿度」，可经设置开启；预留 ESP32 传感器上报 |
| 心情标签 · Mood tags | 纯文字 | 心情相关标签带 emoji |
| 用途 · Use | 演示概念 | 真实两周使用，供参与者记录 |

## 结构 · Files

| 文件 · File | 作用 · Role |
|---|---|
| `index.html` | 页面骨架（建档屏 / 设置 / 传感器卡） |
| `app.js` | 生长式交互 + 后端读写 + 传感器联动 |
| `ontology.js` | 标签本体（身体部位按人体结构排序、温湿度、emoji 心情） |
| `style.css` | 样式 |

## 后端 · Backend

- 服务：`grove_live_server.py`（Python 标准库，无第三方依赖），监听 `127.0.0.1:8004`，以 systemd `grove-live` 托管。
- 数据库：`/opt/grove-live/grove.db`（SQLite）。
- 接口 · Endpoints：`/api/records`（读写）、`/api/sensor`（温湿度上报/读取，供 ESP32 或前端模拟）、`/grove/api/admin?pw=grove-2026`（概览）、`/grove/api/export`（CSV 导出）。
- 部署脚本：`newresearch/_deploy_grove_live.py`（上传前端 + 后端，幂等改 nginx，拉起服务）。

## 已知边界 · Known limitations

📝 TODO（手写）：
- 温湿度目前为「手动模拟上报」占位；接 ESP32 后改为真实读数并做时间对齐。
- 跨发作规律线仅在树林视图内呈现；规律页的统计口径待与 RQ2 对齐。
- 参与者代号无强校验，正式投放前需确定代号发放与知情同意流程。
