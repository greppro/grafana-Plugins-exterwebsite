# 构建阶段
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /app

# 首先复制 package.json 和 package-lock.json
COPY package*.json ./

# 设置 npm 配置并安装依赖
RUN npm config set registry https://registry.npmmirror.com && \
    npm ci --no-audit --no-fund --fetch-retries 5 --fetch-retry-factor 2

# 复制所有源代码和配置文件
COPY . .

# 创建必要的目录和文件
RUN mkdir -p dist/img && \
    cp README.md dist/ || touch dist/README.md && \
    touch dist/img/logo.svg

# 运行 prettier 格式化代码
RUN npm run format || true

# 构建插件
RUN npm run build

# 确保插件.json文件在正确位置
RUN cp src/plugin.json dist/

# 生产阶段
FROM grafana/grafana:latest

# 复制构建好的插件到 Grafana 插件目录
COPY --from=builder /app/dist /var/lib/grafana/plugins/grafana-external-website-panel

# 设置环境变量
ENV GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=grafana-external-website-panel \
    GF_SECURITY_ADMIN_PASSWORD=admin \
    GF_SECURITY_ADMIN_USER=admin \
    GF_LOG_LEVEL=debug \
    GF_PLUGINS_ENABLE_ALPHA=true

# 暴露端口
EXPOSE 3000

USER grafana 