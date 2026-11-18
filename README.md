# Cell-Based IC 設計流程入門 (RTL to GDSII)

> **編輯者：** 高渝欣 (Erica Kao)  
> **最後更新：** 2026 年 11 月  
> **實作範例：** Adder with One Scan Chain

---

## 1. 教材導讀

本教材為課程實驗與實作講義，旨在協助修課同學建立完整的數位 IC 設計流程概念。

講義中將以一個**包含 One Scan Chain 的 DFT 加法器電路**作為範例，完整走過數位 IC 設計從前端到後端的標準 **RTL-to-GDSII** 實作流程。

透過這個邏輯精簡但架構完整的電路案例，同學能將注意力集中在各階段的檔案輸出格式、EDA 工具操作指令、時序與可測性約束（Constraints）設定，以及 Signoff 的檢核邏輯。

---

## 2. 章節架構總覽

* **Front-End & Lint**
  * **01. Circuit Design & Verification**：加法器 RTL 設計、Testbench 功能模擬。
  * **02. Spyglass**：RTL 靜態規則檢查（Lint）與可合成性驗證。

* **Synthesis & DFT**
  * **03. Synthesis**：邏輯合成、時序約束（SDC）設定與 Gate-Level Netlist 產生。
  * **04. DFT**：插入單一掃描鏈（One Scan Chain）與掃描測試架構建置。
  * **05. Presim**：含 DFT 結構之 Gate-Level 功能與時序模擬。
  * **06. ATPG**：自動測試向量產生與故障覆蓋率（Fault Coverage）評估。

* **Back-End & Signoff**
  * **07. Layout**：Floorplan、Placement、CTS、Routing。
  * **08. STA**：靜態時序分析與 Setup / Hold Timing check。
  * **09. Postsim**：繞線後萃取寄生參數（SPEF / SDF）之晶片後模擬。
  * **10. Physical Verification**：實體設計規則檢查（DRC）與電路佈局一致性比對（LVS）。

---

## 3. 版權與使用聲明 

> **版權聲明：** 本教材僅供本課程修課學生於課堂學習與實驗實作參考使用，**嚴禁使用於任何商業用途，亦不同意任何形式之未經授權轉載、重製或散布**。  
> **聯絡方式：** 若有學術交流、內容指正或授權洽詢需求，請透過電子郵件與作者聯繫：yuhsin901111@gmail.com
