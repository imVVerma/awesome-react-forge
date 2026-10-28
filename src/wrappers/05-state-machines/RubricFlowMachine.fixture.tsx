import { RubricFlowMachine } from './RubricFlowMachine';

export default {
  'Full Pipeline': (
    <RubricFlowMachine initialStep="Draft" />
  ),
  'At Human Review': (
    <RubricFlowMachine initialStep="HumanReview" />
  ),
  'Completed': (
    <RubricFlowMachine initialStep="Approved" />
  ),
}