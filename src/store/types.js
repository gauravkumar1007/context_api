const Data = {
    FETCH_DATA: "FETCH_DATA",
    REMOVE_DATA: "REMOVE_DATA",
};

const Component = {
	FULL_PAGE_LOADER: "FULL_PAGE_LOADER",
	SHOW_TOAST: "SHOW_TOAST",
	HIDE_TOAST: "HIDE_TOAST",
	SHOW_POPUP: "SHOW_POPUP",
	HIDE_POPUP: "HIDE_POPUP",
};

const Login = {
	CREATE_SESSION: "CREATE_SESSION",
};

const User = {
	SAVE_USER: "SAVE_USER",
};

export const Types = {
	...Data,
	...Component,
	...Login,
	...User
}