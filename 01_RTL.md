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

## 4. 功能模擬與波形檢視 (VCS & Verdi)
上機提醒： 執行 EDA 工具前，請先確認已載入課堂 PDF 講義指定的環境設定檔。
