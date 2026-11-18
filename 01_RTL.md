---
title: 01. Circuit Design & Verification
nav_order: 2
---
# 01. Circuit Design & Verification

**預計講解時長：** 5 分鐘  
**預計實作時長：** 10 分鐘  
**使用工具：** VCS / Verdi

## 1. 電路規格與架構設計

本課程的加法器實作範例（Adder 採用**內部自動累加架構**，每個時脈週期計算 y = a + b，並同步更新內部運算元 b = b + 1。

### I/O 腳位定義

| 腳位名稱 | 方向 | 位元寬度 | 功能說明 |
| :--- | :--- | :--- | :--- |
| **clk** | Input | 1-bit | 系統時脈訊號（正緣觸發） |
| **arst_n** | Input | 1-bit | 非同步低準位重置訊號（Active-Low Reset） |
| **a** | Input | 4-bit | 無號數輸入運算元（0 ~ 15） |
| **y** | Output | 5-bit | 加法運算結果輸出（y = a + b，保留進位不溢位） |

---

## 2. RTL 設計範例 (adder.v)
<div class="ws-path">
  <strong>工作站檔案位置：</strong><code>~/202612VLSI/RTL/adder.v</code><br>
  <strong>說明：</strong>本設計檔已預先放置於工作站專案目錄下的 <code>RTL</code> 資料夾中，檔名為 <code>adder.v</code>。
</div>

本章節著重於 RTL 驗證流程與工具操作，**不針對 Verilog 語法細節進行教學**；若同學希望深入了解可合成 RTL 撰寫規範，建議選修相關課程。

```verilog
module adder (
    input  wire       clk,
    input  wire       arst_n,
    input  wire [3:0] a,
    output reg  [4:0] y
);
    reg  [3:0] b;
    wire [3:0] next_b;

    assign next_b = b + 4'd1;

    always @(posedge clk or negedge arst_n) begin
        if (!arst_n) begin
            b <= 4'd0;
            y <= 5'd0;
        end else begin
            b <= next_b;
            y <= a + b;
        end
    end
endmodule
```

## 3. Testbench 撰寫 (tb_adder.v)
<div class="ws-path">
  <strong>工作站檔案位置：</strong><code>~/202612VLSI/RTL/tb_adder.v</code><br>
  <strong>說明：</strong>本測試檔已預先放置於工作站專案目錄下的 <code>RTL</code> 資料夾中，檔名為 <code>tb_adder.v</code>。
</div>

內建自動比對機制（Self-Checking），模擬結束時將於終端機直接輸出 PASS 或 FAIL 判定結果，並產生 .fsdb 波形檔供除錯檢視。

```verilog
`timescale 1ns/1ps

module tb_adder;

    reg        clk;
    reg        arst_n;
    reg  [3:0] a;
    wire [4:0] y;

    reg  [3:0] golden_b;
    reg  [4:0] golden_y;
    integer    err_cnt;

    adder u_adder (
        .clk    (clk),
        .arst_n (arst_n),
        .a      (a),
        .y      (y)
    );

    always #5 clk = ~clk;

    always @(posedge clk or negedge arst_n) begin
        if (!arst_n) begin
            golden_b <= 4'd0;
            golden_y <= 5'd0;
        end else begin
            golden_b <= golden_b + 4'd1;
            golden_y <= a + golden_b;
        end
    end

    always @(negedge clk) begin
        if (arst_n) begin
            if (y !== golden_y) begin
                $display("[FAIL] Time=%0t | a=%0d, golden_b=%0d | Expected y=%0d, Got y=%0d",
                         $time, a, golden_b, golden_y, y);
                err_cnt = err_cnt + 1;
            end
        end
    end

    initial begin
        clk     = 1'b0;
        arst_n  = 1'b0;
        a       = 4'd0;
        err_cnt = 0;

        #12 arst_n = 1'b1; // 釋放非同步重置，此時內部 b = 0

        @(negedge clk) a = 4'd5;
        repeat (5) @(negedge clk);

        a = 4'd10;
        repeat (12) @(negedge clk);

        #10;
        if (err_cnt == 0) begin
            $display("========================================");
            $display("   SIMULATION RESULT : PASS (0 Errors)  ");
            $display("========================================");
        end else begin
            $display("========================================");
            $display("   SIMULATION RESULT : FAIL (%0d Errors) ", err_cnt);
            $display("========================================");
        end

        $finish;
    end

    initial begin
        $fsdbDumpfile("adder.fsdb");
        $fsdbDumpvars(0, tb_adder);
    end

endmodule
```
### Code Coverage

在 RTL 驗證中，終端機印出 `PASS` 僅代表**「已執行的 Function Code 符合預期」**，並不能保證所有分支或訊號狀態皆已測試完畢。實際 Tapeout 時會透過 **Code Coverage** 量化測試平台的驗證充分度，常見指標包含：

| 覆蓋率指標 | 英文名稱 | 檢核重點說明 |
| :--- | :--- | :--- |
| **行覆蓋率** | Line Coverage | 確認 RTL 程式碼中的每一行敘述是否皆有被執行到。 |
| **條件 / 分支覆蓋率** | Branch / Condition Coverage | 確認 `if-else`、`case` 等所有條件判斷的 `True` 與 `False` 分支是否皆已觸發。 |
| **翻轉覆蓋率** | Toggle Coverage | 確認每一個訊號與暫存器的每個位元（Bit）是否皆經歷過 `0 -> 1` 與 `1 -> 0` 的狀態切換。 |
| **狀態機覆蓋率** | FSM Coverage | 確認有限狀態機的所有狀態（State）與狀態轉移路徑（Transition）是否皆已走遍。 |

> **Code Coverage** 用於評估設計端 RTL 模擬的測試完整性（目標通常要求 95% ~ 100%）。

## 4. 功能模擬與波形檢視 (VCS & Verdi)
> **上機提醒：** 執行前，請先確認工作站內已存放本次課程所需的 `202612VLSI` 資料夾。

<div class="ws-path">
  <strong>模擬執行目錄：</strong><code>~/202612VLSI/VCS/</code><br>
  <strong>說明：</strong>請於 <code>VCS</code> 資料夾內開啟終端機，並於成功 <code>Source</code> <code>VCS</code> 再度 <code>Source</code> <code>runvcs</code> 執行模擬。
</div>

### 步驟一：於 VCS 資料夾開啟終端機並載入 EDA 環境
請先切換至 `~/202612VLSI/VCS` 資料夾開啟終端機（或在終端機中 `cd` 至該目錄），接著切換至 **C Shell (`csh`)** 並透過 `menu` 指令選擇載入 **VCS**：

```bash
cd ~/202612VLSI/VCS   # 確認位於 VCS 目錄下（若已於該資料夾開啟終端機可省略）
csh                   # 切換至 C Shell 環境
menu                  # 呼叫環境選單，依畫面提示選擇，source VCS
```
