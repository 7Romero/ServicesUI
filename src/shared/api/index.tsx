import auth from "./endpoints/auth";
import section from "./endpoints/section";
import order from "./endpoints/order";
import user from "./endpoints/user";
import application from "./endpoints/application";
import stripe from "./endpoints/stripe";

const allEndpoints = {
    auth,
    section,
    order,
    user,
    application,
    stripe,
};

export default allEndpoints;