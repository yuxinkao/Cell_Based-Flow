# Cell-Based Design Flow

**編輯者：** Erica Kao  
**最後更新：** 2026 年 12 月  
**實作範例：** Adder with One Scan Chain  
**使用製程：** UMC 0.18 µm (1P6M)

---

## 1. 教材導讀

本教材為課程實作講義，旨在協助修課同學建立完整的數位 IC 設計流程概念。

講義中將以一個**包含 One Scan Chain 的 DFT 加法器電路**作為範例，完整走過數位 IC 設計從前端到後端的標準 **RTL-to-GDSII** 實作流程。

考量本課程時長為 **3 小時**，課堂時間將聚焦於流程概念說明，**部分章節僅講解觀念而不進行上機實作**；若同學對這些進階階段感興趣，歡迎於課後利用本講義與相關資源自行深入研究。

> **上機實作提醒：** 本網站主要提供設計流程觀念、指令說明；**考量製程與 EDA 工具保密協議，各階段實際可執行的完整 Tcl 與實驗室環境設定，請修課同學直接參考課堂發放於工作站內的 202612VLSI 內的檔案執行**。

---

## 2. 章節總覽

| 章節名稱 | 預計講解時長 | 預計實作時長 | 實作重點 |
| :--- | :--- | :--- | :--- |
| **Cell-Based Design Flow (本頁)** | 5 分鐘 | — | 課程說明 |
| **01. Circuit Design & Verification** | 5 分鐘 | 10 分鐘 | 加法器 RTL 設計、Testbench 撰寫並使用 VCS & Verdi 進行功能模擬 |
| **02. Lint** | 5 分鐘 | 10 分鐘 | 透過 Spyglass 實作 RTL 靜態規則檢查（Lint）與可合成性驗證 |
| **03. Synthesis** | 15 分鐘 | 10 分鐘 | 透過 Design Compiler 進行邏輯合成、時序約束（SDC）設定並產生 Gate-Level Netlist |
| **04. DFT** | 10 分鐘 | 10 分鐘 | 透過 DFTC 進行 One Scan Chain 的測試架構建置 |
| **05. Presim** | 5 分鐘 | 5 分鐘 | 使用 VCS 進行含 DFT 結構之 Gate-Level 模擬 |
| **06. ATPG** | 5 分鐘 | — | 透過 TetraMAX 自動產生測試向量並進行 Fault Coverage 評估 |
| **07. Layout** | 15 分鐘 | 10 分鐘 | 使用 ICC 進行 Floorplan、Placement、CTS 與 Routing 實體繞線 |
| **08. STA** | 5 分鐘 | — | 使用 PrimeTime 進行靜態時序分析 |
| **09. Postsim** | 5 分鐘 | 5 分鐘 | 使用 VCS 進行含寄生參數（SPEF / SDF）之模擬 |
| **10. Physical Verification** | 5 分鐘 | 10 分鐘 | 使用 Calibre 進行實體設計規則檢查（DRC）與電路佈局一致性比對（LVS） |
| **Q&A** | — | 30 分鐘 | 課堂問題解答 |

---

## 3. 版權與使用聲明 

**版權聲明：** 本教材僅供本課程修課學生於課堂與實作參考使用，**嚴禁使用於任何商業用途，亦不同意任何形式之未經授權轉載、重製或散布**。  

**聯絡方式：** 若有學術交流、內容指正或授權洽詢需求，請透過電子郵件與作者聯繫：m1453003@gm.ncue.edu.tw

<div class="page-end-nav">
  <span class="page-end-text">本章節已閱讀完畢。</span>
  <a href="{{ '[/docs/02-lint/](https://yuxinkao.github.io/Cell_Based-Flow/01_RTL.html)' | relative_url }}" class="next-chapter-btn">
    前往下一章：01. Circuit Design & Verification ➔
  </a>
</div>
