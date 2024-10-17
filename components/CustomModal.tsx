import { Modal } from "react-native";

export default function CustomModal({ modalVisible, toggle, children }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggle}
    >
      {children}
    </Modal>
  );
}
