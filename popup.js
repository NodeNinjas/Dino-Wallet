document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("accountList").addEventListener("click", changeAccount);

  document.getElementById("userAdderss").addEventListener("click", copyAddress);

  document.getElementById("transferFund").addEventListener("click", handler);

  document.getElementById("header_network").addEventListener("click", getOpenNetwork);

  document.getElementById("network_item").addEventListener("click", getSelectedNetwork)

  document.getElementById("add_network").addEventListener("click", setNetwork);

  document.getElementById("loginAccount").addEventListener("click", loginUser);

  document.getElementById("accountCreate").addEventListener("click", createUser);

  document.getElementById("openCreate").addEventListener("click", openCreate);

  document.getElementById("sign_up").addEventListener("click", signUp);

  document.getElementById("login_up").addEventListener("click", login);

  document.getElementById("logout").addEventListener("click", logout);

  document.getElementById("open_Transfer").addEventListener("click", openTransfer);

  document.getElementById("goBack").addEventListener("click", goBack);

  document.getElementById("open_Import").addEventListener("click", openImport);

  document.getElementById("open_assets").addEventListener("click", openAssets);

  document.getElementById("open_activity").addEventListener("click", openActivity);

  document.getElementById("goHomePage").addEventListener("click", goHomePage);

  document.getElementById("openAccountImport").addEventListener("click", openImportModel);

  document.getElementById("close_import_account").addEventListener("click", closeImportModel);

  document.getElementById("add_new_token").addEventListener("click", addToken);

  document.getElementById("add_new_Account").addEventListener("click", addAccount);
});

// State Varibles
let providerURL =
  "https://polygon-mumbai.g.alchemy.com/v2/8hUjOq3bU4lGuhAJiG_hBBIoM3Oa4RlA";
// let provider;
let privateKey;
let address;

// Functions
const handler = () => {
    document.getElementById("transfer_center").style.display = "flex";

    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;

    const private_key =
      "7bee2dae53beb0bd18c124279261a7d083d55a2c04693661930653d8e1c2f0ec";
    const testAccount = "0x31c629BFF928b38460ca6D5B217Ba46457ef75fC";

    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount), 
    }

    let a = document.getElementById("link");
    a.href = "lnink";

    wallet.sendTransaction(tx).then((txObj) => {
        console.log("TxHash: ", txObj.hash);

        document.getElementById("transfer_center").style.display = "none";
        const a = document.getElementById("link");

        document.getElementById("link").style.display = "block";
    })
};

const checkBalance = () => {
    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    provider.getBalance(address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);

        document.getElementById("accountBalance").innerHTML = `${balanceInEth} MATIC`;

        document.getElementById("userAddress").innerHTML = `${address.slice(0,15)}...`;
    })
};

const getOpenNetwork = () => {
    document.getElementById("network").style.display = "block";
};

const getSelectedNetwork = (e) => {
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;

    if(e.target.innerHTML === "Ethereum Sepolia") {
        providerURL =
          "https://eth-sepolia.g.alchemy.com/v2/duX88_Ev-NGsAUs8GzU6HmlPFm18Xj4u";
        
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML === "Polygon Mumbai") {
        providerURL =
          "https://polygon-mumbai.g.alchemy.com/v2/8hUjOq3bU4lGuhAJiG_hBBIoM3Oa4RlA";

        document.getElementById("network").style.display = "none";
    }

    console.log(providerURL);
};

const setNetwork = () => {
    document.getElementById("network").style.display = "none";
};

const loginUser = () => {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
};

const createUser = () => {
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("LoginUser").style.display = "none";
};

const openCreate = () => {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
};

const signUp = () => {
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;
    const aadhar = document.getElementById("sign_up_aadhar").value;
    const panCard = document.getElementById("sign_up_pancard").value;

    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "block";

    const wallet = ethers.Wallet.createRandom();

    if(wallet.address) {
        console.log(wallet);

        // API CALL
        const url = "http://localhost:3000/api/v1/user/signup";

        const data = {
          name: name,
          email: email,
          password: password,
          aadhar: aadhar,
          panCard: panCard,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        };

        fetch(url, {
            method: "POST",
            handlers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((result) => {
            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML =
            wallet.privateKey;
            document.getElementById("createdMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("sign_up").style.display = "none";

            const userWallet = {
              address: wallet.address,
              private_key: wallet.privateKey,
              mnemonic: wallet.mnemonic.phrase,
            };

            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet", jsonObj);

            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
    }
};

const login = () => {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "block";

    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;

    const url = "http://localhost:3000/api/v1/user/login";
    const data = {
        email: email,
        password: password,
    }

    fetch(url, {
      method: "POST",
      handlers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const userWallet = {
          address: result.data.user.address,
          private_key: result.data.user.private_Key,
          mnemonic: result.data.user.mnemonic,
        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
};

const logout = () => {
    localStorage.removeItem("userWallet");
    window.location.reload();
};

const openTransfer = () => {
    document.getElementById("transfer_from").style.display = "block";
    document.getElementById("home").style.display = "none";
};

const goBack = () => {
    document.getElementById("transfer_from").style.display = "none";
    document.getElementById("home").style.display = "block";
};

const openImport = () => {
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

const importGoBack = () => {
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
};

const openActivity = () => {
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

const openAssets = () => {
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
};

const goHomePage = () => {
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
};

const openImportModel = () => {
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
};

const closeImportModel = () => {
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
};

const addToken = () => {
    const address = document.getElementById("token_address").value;
    const name = document.getElementById("token_name").value;
    const symbol = document.getElementById("token_symbol").value;

    const url = "http://localhost:3000/api/v1/tokens/createtoken";

    const data = {
        name: name,
        address: address,
        symbol
    }

    fetch(url, {
      method: "POST",
      handlers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
};

const addAccount = () => {
    const privateKey = document.getElementById("add_account_private_key").value;

    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey, provider);

    const url = "http://localhost:3000/api/v1/account/createaccount";

    const data = {
      privateKey: privateKey,
      address: wallet.address,
    };

    fetch(url, {
      method: "POST",
      handlers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
};

const myFunction = () => {
    const str = localStorage.getItem("userWallet");
    const parsedObj = JSON.parse(str);

    if(parsedObj.address) {
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";
    
        privateKey = parsedObj.private_Key;
        address = parsedObj.address;
    
        checkBalance(parsedObj.address);

    }

    const tokenRender = document.querySelector(".assets");
    const accountReader = document.querySelector(".accountList");
    
    const url = "http://localhost:3000/api/v1/tokens/alltoken";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let elements = "";

        data.data.tokens.map(
          (token) =>
            (elements += `
           <div class="assets_item">
            <img 
                class="assets_item_img" 
                src="./assets/theblockchaincoders.png"
                alt=""
            />

            <span> ${token.address.slice(0, 15)}...</span>
            <span>${token.symbol}</span>
           </div>
        `)
        );

        tokenRender.innerHTML = elements;
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let accounts = "";

        data.data.accounts.map(
          (account, i) =>
            (account += `
                <div class = "lists">
                <p>${i + 1}</p>
                <p class="accountValue" data-address=${
                  account.address
                } data-privateKey=${account.privateKey}>
                    ${account.address.slice(0, 25)}...
                </p>
            `)
        );

        accountReader.innerHTML = elements;
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    console.log(privateKey);
};

const copyAddress = () => {
    navigator.clipboard.writeText(address);
};

const changeAccount = () => {
    const data = document.querySelector(".accountValue");
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey");

    console.log({address, privateKey});

    const userWallet = {
      address: address,
      private_key: privateKey,
      mnemonic: "",
    };

    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);

    window.location.reload();
};

window.onload = myFunction;