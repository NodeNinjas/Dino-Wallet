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

const setNetwork = () => {};

const loginUser = () => {};

const createUser = () => {};

const openCreate = () => {};

const signUp = () => {};

const login = () => {};

const logout = () => {};

const openTransfer = () => {};

const goBack = () => {};

const openImport = () => {};

const importGoBack = () => {};

const openActivity = () => {};

const openAssets = () => {};

const goHomePage = () => {};

const openImportModel = () => {};

const closeImportModel = () => {};

const addToken = () => {};

const addAccount = () => {};

const myFunction = () => {};

const copyAddress = () => {};

const changeAccount = () => {};
