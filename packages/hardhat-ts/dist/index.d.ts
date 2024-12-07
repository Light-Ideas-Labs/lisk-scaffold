declare const SampleContract: readonly [{
    readonly inputs: readonly [];
    readonly name: "getData";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_data";
        readonly type: "uint256";
    }];
    readonly name: "setData";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
declare const TodoList: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_initialOwner";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "OwnableInvalidOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "OwnableUnauthorizedAccount";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "text";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "completed";
        readonly type: "bool";
    }];
    readonly name: "TodoAdded";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "_todo";
        readonly type: "string";
    }];
    readonly name: "add";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getAll";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "string";
            readonly name: "text";
            readonly type: "string";
        }, {
            readonly internalType: "bool";
            readonly name: "completed";
            readonly type: "bool";
        }];
        readonly internalType: "struct TodoList.Todo[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly name: "isCompleted";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "todos";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "text";
        readonly type: "string";
    }, {
        readonly internalType: "bool";
        readonly name: "completed";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly name: "toggleCompleted";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
declare const abis: {
    readonly SampleContract: readonly [{
        readonly inputs: readonly [];
        readonly name: "getData";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_data";
            readonly type: "uint256";
        }];
        readonly name: "setData";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    readonly TodoList: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_initialOwner";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "OwnableInvalidOwner";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "OwnableUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "text";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "completed";
            readonly type: "bool";
        }];
        readonly name: "TodoAdded";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "_todo";
            readonly type: "string";
        }];
        readonly name: "add";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getAll";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "string";
                readonly name: "text";
                readonly type: "string";
            }, {
                readonly internalType: "bool";
                readonly name: "completed";
                readonly type: "bool";
            }];
            readonly internalType: "struct TodoList.Todo[]";
            readonly name: "";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_index";
            readonly type: "uint256";
        }];
        readonly name: "isCompleted";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "todos";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "text";
            readonly type: "string";
        }, {
            readonly internalType: "bool";
            readonly name: "completed";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_index";
            readonly type: "uint256";
        }];
        readonly name: "toggleCompleted";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
};

declare const contractAddresses: {
    readonly localhost: {
        readonly SampleContract: "0x0165878A594ca255338adfa4d48449f69242Eb8F";
        readonly TodoList: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
    };
};

export { SampleContract, TodoList, abis, contractAddresses };
