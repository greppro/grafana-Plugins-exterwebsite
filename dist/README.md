# Grafana External Website Panel Plugin

这个 Grafana 插件允许您在仪表板面板中嵌入外部网站。

## 功能特点

- 在 Grafana 面板中嵌入任何外部网站
- 可配置iframe的宽度和高度
- 支持定期自动刷新
- 安全的iframe沙箱配置

## 安装

1. 下载此插件到 Grafana 的插件目录
2. 重启 Grafana 服务器
3. 在 Grafana UI 中启用插件

## 使用方法

1. 创建新的仪表板或编辑现有仪表板
2. 添加新面板，选择 "External Website" 类型
3. 在面板设置中配置以下选项：
   - Website URL: 要嵌入的网站URL
   - Height: iframe的高度（例如：100%，500px）
   - Width: iframe的宽度（例如：100%，800px）
   - Refresh Rate: 自动刷新间隔（秒），设置为0禁用自动刷新

## 开发

```bash
# 安装依赖
npm install

# 构建插件
npm run build

# 开发模式
npm run dev
```
