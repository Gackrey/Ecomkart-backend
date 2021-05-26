const { extend } = require("lodash");
const addAddress = async (req, res) => {
  let { user } = req;
  const newAddress = req.body;
  user.addresses.push(newAddress);
  await user.save();
  res.json({ success: true });
};

const deleteAddress = async (req, res) => {
  let { user } = req;
  const address_id = req.body.id;
  const updatedAddress = user.addresses.filter(
    (item) => item.id !== address_id
  );
  user = extend(user, { addresses: updatedAddress });
  await user.save();
  res.json({ success: true });
};

const updateAddress = async (req, res) => {
  let { user } = req;
  const recAddress = req.body;
  const updatedAddress = user.addresses.map((item) =>
    item.id === recAddress.id
      ? {
          ...item,
          name: recAddress.name,
          address: recAddress.address,
          zip: recAddress.zip,
          phone: recAddress.phone,
          State: recAddress.State,
          city: recAddress.city,
        }
      : item
  );
  user = extend(user, { addresses: updatedAddress });
  await user.save();
  res.json({ success: true, user });
};

module.exports = { addAddress, deleteAddress, updateAddress };
