const RECORDS_DB = {
    "O1244B53F93FFBF235E222": {
        designation: "FADING FANTOM"
    },
	"A0011000000NF000000000": {
        designation: "NOT FOUND"
    }/*,
	"O1244B53F93FFBF235E222": {
        designation: "FADING FANTOM"
    }*/
};

function lookupRecord(fullId) {
    const record = RECORDS_DB[fullId];
    if (record) {
        return {
            found: true,
            designation: record.designation
        };
    }
    return { found: false };
}

// Attach to window for global access
if (typeof window !== 'undefined') {
    window.RECORDS_DB = RECORDS_DB;
    window.lookupRecord = lookupRecord;
}
