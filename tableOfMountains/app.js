'use strict';

function rowHeights(rows) {
    return rows.map(function (row) {
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function (_, i) {
        return rows.reduce(function (max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum) {
        var blocks = row.map(function (cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }

    return rows.map(drawRow).join("\n");
}

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function (row) {
        return keys.map(function (name) {
            return new TextCell(String(row[name]));
        });
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));
