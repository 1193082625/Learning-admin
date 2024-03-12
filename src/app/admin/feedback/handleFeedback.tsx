import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react";

export interface SelectOption {
  label: string;
  value: any;
  description: string;
}

interface HandleFeedbackProps {
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  [key: string]: any
}

const handleOptions: SelectOption[] = [
  {
    label: '排队中',
    value: 0,
    description: ''
  },{
    label: '处理完成',
    value: 1,
    description: ''
  },{
    label: '挂起',
    value: 2,
    description: ''
  },{
    label: '关闭',
    value: 3,
    description: ''
  },{
    label: '处理中',
    value: 4,
    description: ''
  }
]

const priorityOptions = [
  {
    label: 'A',
    value: 0,
    description: ''
  },{
    label: 'B',
    value: 1,
    description: ''
  },{
    label: 'C',
    value: 2,
    description: ''
  },{
    label: 'D',
    value: 3,
    description: ''
  }
]

export default function HandleFeedback({
  title = '提示',
  isOpen,
  onOpenChange,
  ...props
}: HandleFeedbackProps) {
  return (
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center">
                  <Select
                    isRequired
                    items={handleOptions}
                    label="处理反馈"
                    placeholder="Select an option"
                    defaultSelectedKeys={[handleOptions[0].value]}
                    className="max-w-xs mb-5"
                  >
                    {(option) => <SelectItem key={option.value}>{option.label}</SelectItem>}
                  </Select>
                  <Select
                    isRequired
                    items={priorityOptions}
                    label="更新优先级"
                    placeholder="Select an option"
                    defaultSelectedKeys={[priorityOptions[0].value]}
                    className="max-w-xs mb-5"
                  >
                    {(option) => <SelectItem key={option.value}>{option.label}</SelectItem>}
                  </Select>
                  <Textarea
                    label="回复"
                    placeholder=""
                    className="max-w-xs"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  关闭
                </Button>
                <Button color="primary" onPress={onClose}>
                  提交
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}