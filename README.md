# Cell-Based Design Flow

> **編輯者：** Erica Kao  
> **最後更新：** 2026 年 11 月  
> **實作範例：** Adder with One Scan Chain

---

## 1. 教材導讀

本教材為課程實作講義，旨在協助修課同學建立完整的數位 IC 設計流程概念。

講義中將以一個**包含 One Scan Chain 的 DFT 加法器電路**作為範例，完整走過數位 IC 設計從前端到後端的標準 **RTL-to-GDSII** 實作流程。

透過這個邏輯精簡但架構完整的電路案例，同學能將注意力集中在各階段的檔案輸出格式、EDA 工具操作指令、Constraints 設定，以及 Signoff 的檢核邏輯。

> **上機實作提醒：** 本網站主要提供設計流程觀念、指令說明；**考量製程與 EDA 工具保密協議，各階段實際可執行的完整 Tcl 與實驗室環境設定，請修課同學直接參考課堂發放的 PDF 講義執行**。

---

## 2. 章節總覽

| 章節名稱 | 實作重點 |
| :--- | :--- |
| **01. Circuit Design & Verification** | 加法器 RTL 設計、Testbench 撰寫並使用 VCS & Verdi 進行功能模擬 |
| **02. Lint** | 透過 Spyglass 實作 RTL 靜態規則檢查（Lint）與可合成性驗證 |
| **03. Synthesis** | 透過 Design Compiler 進行邏輯合成、時序約束（SDC）設定並產生 Gate-Level Netlist |
| **04. DFT** | 透過 DFTC 進行 One Scan Chain 的測試架構建置 |
| **05. Presim** | 使用 VCS 進行含 DFT 結構之 Gate-Level 模擬 |
| **06. ATPG** | 透過 TetraMAX 自動產生測試向量並進行 Fault Coverage 評估 |
| **07. Layout** | 使用 ICC 進行 Floorplan、Placement、CTS 與 Routing 實體繞線 |
| **08. STA** | 使用 PrimeTime 進行靜態時序分析 |
| **09. Postsim** | 使用 VCS 進行含寄生參數（SPEF / SDF）之模擬 |
| **10. Physical Verification** | DRC 與 LVS |

---

## 3. 版權與使用聲明 

> **版權聲明：** 本教材僅供本課程修課學生於課堂學習與實驗實作參考使用，**嚴禁使用於任何商業用途，亦不同意任何形式之未經授權轉載、重製或散布**。  
> **聯絡方式：** 若有學術交流、內容指正或授權洽詢需求，請透過電子郵件與作者聯繫：m1453003@gm.ncue.edu.tw
