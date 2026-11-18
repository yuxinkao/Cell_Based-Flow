---
title: 01. Circuit Design & Verification
nav_order: 2
---
# 01. Circuit Design & Verification

**預計講解時長：** 5 分鐘  
**預計實作時長：** 10 分鐘  
**使用工具：** VCS / Verdi

## 1. 電路規格與架構設計

本課程的加法器實作範例（`Adder`）採用**內部自動累加架構**，每個時脈週期計算 $y = a + b$，並同步更新內部運算元 $b = b + 1$。

透過將運算結果 `y` 與內部計數器 `b` 皆設計為時脈同步暫存器（Flip-Flops），電路內部不僅具備完整的 **Register-to-Register** 時序路徑供後續 **03. Synthesis** 與 **08. STA** 分析關鍵路徑延遲，也能在 **04. DFT** 階段將所有正反器串接成一條 **One Scan Chain**。

### I/O 腳位定義（以 4-bit 運算為例）

| 腳位名稱 | 方向 | 位元寬度 | 功能說明 |
| :--- | :--- | :--- | :--- |
| **`clk`** | Input | 1-bit | 系統時脈訊號（正緣觸發） |
| **`rst_n`** | Input | 1-bit | 非同步低準位重置訊號（Active-Low Reset） |
| **`a`** | Input | 4-bit | 無號數輸入運算元（0 ~ 15） |
| **`y`** | Output | 5-bit | 加法運算結果輸出（$y = a + b$，保留進位不溢位） |

---

## 2. RTL 設計範例 (`adder.v`)

採用標準的**組合邏輯與循序邏輯分離寫法**，清楚區分組合運算（`next_b`、`next_y`）與正反器狀態更新（`b`、`y`），避免產生非預期的 Latch 或位元寬度不匹配警告：

```verilog
module adder (
    input  wire       clk,
    input  wire       rst_n,
    input  wire [3:0] a,
    output reg  [4:0] y
);
    reg  [3:0] b;
    wire [3:0] next_b;
    wire [4:0] next_y;

    // 組合邏輯 (Combinational Logic)
    assign next_b = b + 4'd1;
    assign next_y = a + b;

    // 循序邏輯 (Sequential Logic)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            b <= 4'd0;
            y <= 5'd0;
        end else begin
            b <= next_b;
            y <= next_y;
        end
    end
endmodule
```

## 3. Testbench 撰寫 (tb_adder.v)
Testbench 負責產生時脈、重置訊號與輸入測試向量 a，並呼叫系統任務輸出 .fsdb 波形檔，方便於 Verdi 中觀察內部暫存器 b 逐拍遞增與輸出 y 的變化規律。

```verilog
`timescale 1ns/1ps

module tb_adder;

    reg        clk;
    reg        rst_n;
    reg  [3:0] a;
    wire [4:0] y;

    // 實例化待測電路 (DUT)
    adder u_adder (
        .clk   (clk),
        .rst_n (rst_n),
        .a     (a),
        .y     (y)
    );

    // 產生 10ns 週期 (100MHz) 之系統時脈
    always #5 clk = ~clk;

    // 測試向量與模擬流程控制
    initial begin
        clk   = 1'b0;
        rst_n = 1'b0;
        a     = 4'd0;

        #12 rst_n = 1'b1; // 釋放重置，此時內部 b = 0

        // 設定 a = 5，觀察 b 從 0, 1, 2, 3... 遞增時 y 的輸出變化
        @(negedge clk) a = 4'd5;
        repeat (5) @(negedge clk);

        // 切換 a = 10，繼續觀察累加結果
        a = 4'd10;
        repeat (5) @(negedge clk);

        #20 $finish;
    end

    // 輸出 FSDB 波形檔供 Verdi 檢視
    initial begin
        $fsdbDumpfile("adder.fsdb");
        $fsdbDumpvars(0, tb_adder);
    end

endmodule
```

## 4. 功能模擬與波形檢視 (VCS & Verdi)
上機提醒： 執行 EDA 工具前，請先確認已載入課堂 PDF 講義指定的環境設定檔。
