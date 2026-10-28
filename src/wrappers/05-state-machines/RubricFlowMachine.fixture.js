import { jsx as _jsx } from "react/jsx-runtime";
import { RubricFlowMachine } from './RubricFlowMachine';
export default {
    'Full Pipeline': (_jsx(RubricFlowMachine, { initialStep: "Draft" })),
    'At Human Review': (_jsx(RubricFlowMachine, { initialStep: "HumanReview" })),
    'Completed': (_jsx(RubricFlowMachine, { initialStep: "Approved" })),
};
