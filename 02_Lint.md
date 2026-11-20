---
title: 02. Lint
nav_order: 3
---
# 02. Lint

---

**預計講解時長：** 5 分鐘  
**預計實作時長：** 10 分鐘  
**使用工具：** SpyGlass  

<div class="ws-path">
  <strong>環境警示：</strong>目前 <code>5924 (E413 實驗室工作站)</code> 尚未安裝 <code>SpyGlass</code> 工具。
</div>

---

## 1. 步驟目的與觀念說明

在進行邏輯合成（Synthesis）之前，透過 Spyglass 提早找出 Design 中的潛在語法與結構瑕疵（例如：非預期的 Latch 推論、未連接訊號、位元寬度不匹配、多重驅動源或跨時脈域風險），完善 Coding Style，確保 RTL 程式碼具備良好的可合成性（Synthesizability）與設計規範一致性。

---

## 2. 上機實作步驟

<div class="ws-path">
  <strong>Lint 執行目錄：</strong><code>~/202612VLSI/RTL/</code><br>
  <strong>說明：</strong>請於 <code>RTL</code> 資料夾內開啟終端機，並於成功載入 <code>SpyGlass</code> 環境後，輸入 <code>spyglass</code> 開啟 tool。
</div>

### 步驟一：於 RTL 資料夾開啟終端機並載入 EDA 環境

請先切換至 `~/202612VLSI/RTL` 資料夾開啟終端機（或在終端機中 `cd` 至該目錄），接著切換至 C Shell（`csh`）並透過 `menu` 指令選擇載入 **SpyGlass**：

```bash
csh
menu
```

### 步驟二：啟動 SpyGlass 工具

待終端機畫面顯示 SpyGlass 環境載入完成後，於同一終端機輸入以下指令開啟工具介面：

```bash
spyglass
```

### 步驟三：匯入設計檔案並執行 Lint 檢查

1. 開啟 SpyGlass GUI 後，點擊左側 add file，加入位於 `RTL` 資料夾中的待測設計檔案（`adder.v`）後，點擊add並按OK離開。
2. 點擊上方的 **goal setup** 並全選 lint 內容後按下 **Run goal(s)**。
3. 檢視 **Message** 中的 **Error** 與 **Warning** 項目，確認語法或結構錯誤（不可有 `Error` ，若有 `Warning` 需評估是否會產生非預期 Latch 或合成落差），確認無誤後即可關閉視窗。
4. 若有修改 RTL 程式碼，標準流程須重新執行一次 **VCS 功能模擬** 以確保修改後的電路行為仍正確無誤，確認通過後再進入下一階段（Synthesis）。

> **上機提醒：** 本次上機實作因課程時間關係，確認 Lint 檢查無誤後不再次進行 VCS 模擬，可直接進入下一階段。


<div class="page-end-nav">
  <span class="page-end-text">本章節已閱讀完畢，請確認以上實作皆已完成。</span>
  <a href="{{ '/03_Synthesis.html' | relative_url }}" class="next-chapter-btn">
    前往下一章：03. Synthesis  ➔
  </a>
</div>
