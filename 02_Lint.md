---
title: 02. Lint
nav_order: 3
---
# 02. Lint

---

**預計講解時長：** 5 分鐘  
**預計實作時長：** 10 分鐘  
**使用工具：** SpyGlass  

---

## 1. 步驟目的與觀念說明

在進行邏輯合成（Synthesis）之前，透過 RTL Lint 靜態程式碼檢查工具，提早找出設計中的潛在語法與結構瑕疵（例如：非預期的 Latch 推論、未連接訊號、位元寬度不匹配、多重驅動源或跨時脈域風險），確保 RTL 程式碼具備良好的可合成性（Synthesizability）與設計規範一致性。

---

## 2. 上機實作步驟

<div class="ws-path">
  <strong>Lint 執行目錄：</strong><code>~/202612VLSI/Lint/</code><br>
  <strong>說明：</strong>請於 <code>Lint</code> 資料夾內開啟終端機，並於成功載入 <code>SpyGlass</code> 環境後，執行 <code>source script/runlint</code> 進行靜態檢查。
</div>

### 步驟一：於 Lint 資料夾開啟終端機並載入 EDA 環境

請先切換至 `~/202612VLSI/Lint` 資料夾開啟終端機（或在終端機中 `cd` 至該目錄），接著切換至 C Shell（`csh`）並透過 `menu` 指令選擇載入 **SpyGlass**：

```bash
csh
menu
```


<div class="page-end-nav">
  <span class="page-end-text">本章節已閱讀完畢，請確認以上實作皆已完成。</span>
  <a href="{{ '/03_Synthesis.html' | relative_url }}" class="next-chapter-btn">
    前往下一章：03. Synthesis  ➔
  </a>
</div>
