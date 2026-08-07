# Skills

一组面向日常开发工作流的个人 Agent Skills。每个 skill 都把适用场景、执行步骤、能力边界和验证要求写进独立的 `SKILL.md`，方便支持 Agent Skills 的工具按任务自动加载，也可以由用户显式指定。

本页只介绍仓库 `.gitignore` 白名单中允许公开的 skill。本机安装的其他 skill、插件和 Agent 状态默认保持私有。

## 能力总览

| Skill                                                                             | 解决的问题                                                                              | 典型使用场景                                                     |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`commit-granularity`](../skills/commit-granularity/SKILL.md)                     | 按业务或技术意图拆分 Git 提交                                                           | 提交代码、拆分混合变更、检查暂存区、修正过大的提交               |
| [`github-open-source-lifecycle`](../skills/github-open-source-lifecycle/SKILL.md) | 让 GitHub 开源项目的公开界面、交付方式和维护流程保持一致，并内置 npm/GitHub README 分层 | 开源规范化、发布准备、文档拆分、托管迁移、版本发布、公开仓库体检 |

## 从 skills.sh 安装

可以在 [skills.sh](https://skills.sh/cixiangtao/skills) 查看本仓库的公开 Skill，也可以通过 Skills CLI 直接选择安装：

```bash
npx skills add cixiangtao/skills
```

只安装某一个 Skill：

```bash
npx skills add cixiangtao/skills --skill commit-granularity
npx skills add cixiangtao/skills --skill github-open-source-lifecycle
```

## `commit-granularity`

把“一个提交只表达一个清晰意图”落实为提交前的强制检查。

核心能力：

- 在暂存前检查完整工作区，包括已暂存、未暂存变更和仓库既有提交风格。
- 按功能、修复、重构、样式、兼容性、依赖、测试、文档或生成物等真实意图划分提交。
- 在执行暂存前，先说明计划创建多少个提交、每个提交的目的和主要文件范围。
- 当同一文件包含多个意图时，要求进行局部拆分；边界无法可靠判断时暂停并向用户确认。
- 将不可分割的源文件与生成结果放在同一提交中，同时隔离无关的机械修改。

能力边界：

- 它负责保证提交颗粒度，不会把“提交代码”扩大解释为推送远端。
- 它不会仅按文件数量拆分，也不会把无关改动为了减少提交数而强行合并。

## `github-open-source-lifecycle`

围绕项目实际交付物，协调 GitHub 仓库从局部公开界面调整到完整发布维护的生命周期。

核心能力：

- 识别源码仓库、npm/PyPI/crates.io 等包、CLI、应用、容器、扩展、文档站和 GitHub Release 等真实交付面。
- 检查 README、LICENSE、贡献与安全说明、GitHub About、包元数据、CI、文档托管、版本、标签和发布产物之间的一致性。
- 根据请求控制审查范围：局部任务只检查目标界面及其直接依赖；开源或发布就绪任务才执行完整生命周期审查。
- 在确认公开内容语言策略后，内部完成 npm 包 README 与 GitHub 仓库 README 的分层、链接迁移和真实 tarball 校验。
- 使用 `Blocking`、`Recommended`、`Optional` 区分阻塞问题、重要改进和成熟度增强，避免把所有治理文件都当成硬性要求。
- 尊重 Node、Python、Rust、Go、JVM、容器、桌面应用和扩展各自的原生构建与发布方式。
- 按声明选择证据：源码与配置、本地产物、全新消费者验证、远端 API、公开下载结果分别证明不同层级的结论。
- 支持文档托管迁移、版本发布和旧公开入口退役，并对外部写入、发布和破坏性操作保持明确授权边界。

能力边界：

- 单个 README、CI 或元数据任务不会自动升级为全仓治理审计。
- README 分层是 lifecycle 的内部工作流，不再作为独立 skill 入口；显式共用 README、非 GitHub 主机和无关机械修改不会被强制拆分。
- 配置完成不等于已经部署，构建成功不等于已经发布；只有对应的公开状态验证通过后，才会声明“已上线”或“已发布”。
- 分析请求默认只读；提交、推送、发布和删除需要用户给出对应授权。

## 使用方式

优先通过 Skills CLI 选择并安装所需 Skill；也可以将对应目录复制到 Agent 支持的 skills 目录中。支持按描述自动触发的 Agent 会在任务命中适用场景时加载对应的 `SKILL.md`；也可以在请求中直接点名 Skill。

仓库采用显式白名单策略。新增本地 skill 不会自动进入 Git；只有同时确认其内容适合公开并更新 [`.gitignore`](../.gitignore) 白名单后，才会成为本仓库的一部分。
