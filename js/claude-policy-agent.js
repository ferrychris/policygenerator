// Claude Policy Generator Agent
// This agent takes form data and policy templates to generate custom policies using Claude

// Import required libraries (ensure these are installed in package.json)
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class ClaudePolicyAgent {
    constructor(apiKey = process.env.CLAUDE_API_KEY) {
        this.apiKey = apiKey;
        this.apiEndpoint = 'https://api.anthropic.com/v1/messages';
        this.model = 'claude-3-sonnet-20240229'; // Update with latest Claude model as needed
        this.policyTemplatesDir = path.join(__dirname, '..', 'policy-templates');
    }

    /**
     * Generate a policy using Claude based on form data and template
     * @param {Object} formData - Form data from the generator.html
     * @param {String} policyType - Type of policy to generate
     * @returns {Promise<String>} - Generated policy as markdown
     */
    async generatePolicy(formData, policyType) {
        try {
            // 1. Load policy template
            const templatePath = this.getTemplatePath(policyType);
            const template = await fs.readFile(templatePath, 'utf8');
            
            // 2. Format the prompt for Claude
            const prompt = this.formatPrompt(formData, template, policyType);
            
            // 3. Call Claude API
            const generatedPolicy = await this.callClaude(prompt);
            
            return generatedPolicy;
        } catch (error) {
            console.error(`Error generating policy: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get the path to a policy template file
     * @param {String} policyType - Type of policy to generate
     * @returns {String} - Path to the template file
     */
    getTemplatePath(policyType) {
        const templateMap = {
            'ethics': 'ai-ethics-policy.md',
            'risk': 'ai-risk-management-policy.md',
            'data': 'ai-data-governance-policy.md',
            'security': 'ai-security-policy.md',
            'model': 'ai-model-management-policy.md',
            'vendor': 'ai-procurement-vendor-management-policy.md',
            'usecase': 'ai-use-case-evaluation-policy.md',
            'master': 'ai-governance-master-policy.md'
        };
        
        const templateFile = templateMap[policyType] || 'ai-ethics-policy.md';
        return path.join(this.policyTemplatesDir, templateFile);
    }

    /**
     * Format the prompt for Claude based on form data and template
     * @param {Object} formData - Form data from the generator.html
     * @param {String} template - Policy template content
     * @param {String} policyType - Type of policy to generate
     * @returns {String} - Formatted prompt for Claude
     */
    formatPrompt(formData, template, policyType) {
        // Extract organization info from form data
        const orgName = formData.get('org-name') || 'Organization';
        const industry = formData.get('industry') || 'technology';
        const size = formData.get('size') || 'medium';
        const aiMaturity = formData.get('ai-maturity') || 'developing';
        const additionalRequirements = formData.get('additional-requirements') || '';
        
        // Create geographical scope
        const geoScope = [];
        if (formData.get('geo-na')) geoScope.push('North America');
        if (formData.get('geo-eu')) geoScope.push('Europe (EU)');
        if (formData.get('geo-global')) geoScope.push('Global');
        
        // Create ethical principles
        const ethicalPrinciples = [];
        if (formData.get('ethics-fairness')) ethicalPrinciples.push('fairness and non-discrimination');
        if (formData.get('ethics-transparency')) ethicalPrinciples.push('transparency and explainability');
        if (formData.get('ethics-privacy')) ethicalPrinciples.push('privacy and data protection');
        if (formData.get('ethics-safety')) ethicalPrinciples.push('safety and security');
        
        // Create risk categories
        const riskCategories = [];
        if (formData.get('risk-technical')) riskCategories.push('technical risks (performance, accuracy)');
        if (formData.get('risk-ethical')) riskCategories.push('ethical risks (bias, fairness)');
        if (formData.get('risk-legal')) riskCategories.push('legal/compliance risks');
        if (formData.get('risk-reputation')) riskCategories.push('reputational risks');
        
        // Build detailed instructions for Claude
        return `
You are an AI policy generation expert specializing in helping organizations create comprehensive, regulatory-compliant AI governance policies. Your task is to customize an AI ${this.getPolicyTypeName(policyType)} policy template for a specific organization based on their profile and needs.

# ORGANIZATION PROFILE
- Name: ${orgName}
- Industry: ${industry}
- Size: ${size}
- Geographic Operations: ${geoScope.join(', ') || 'Not specified'}
- AI Maturity Level: ${aiMaturity}
- Ethical Principles Emphasis: ${ethicalPrinciples.join(', ') || 'All standard principles'}
- Risk Categories Emphasis: ${riskCategories.join(', ') || 'All standard risk categories'}
- Additional Requirements: ${additionalRequirements}

# TEMPLATE TO CUSTOMIZE
\`\`\`markdown
${template}
\`\`\`

# CUSTOMIZATION INSTRUCTIONS
1. Tailor the policy to ${orgName}'s specific industry (${industry}), size (${size}), and geography (${geoScope.join(', ') || 'not specified'}).
2. Adapt the policy to the organization's AI maturity level (${aiMaturity}).
3. Emphasize the ethical principles and risk categories indicated in the profile.
4. Add industry-specific considerations, examples, and controls.
5. Modify the roles and responsibilities to match what would be appropriate for ${orgName}'s size and structure.
6. Address any additional requirements specified.
7. Create realistic implementation guidelines that are practical for an organization of this profile.
8. Ensure the policy meets regulatory requirements for the specified geographic operations.
9. Keep the original structure of the policy (sections, numbering) but enhance the content.
10. Write in a clear, professional tone appropriate for a formal policy document.
11. Return ONLY the complete customized policy in markdown format without any explanation or additional text.

Generate a comprehensive, customized ${this.getPolicyTypeName(policyType)} policy for ${orgName} that they can immediately adopt.
`;
    }

    /**
     * Get the full name of a policy type
     * @param {String} policyType - Short policy type (e.g., 'ethics')
     * @returns {String} - Full policy name
     */
    getPolicyTypeName(policyType) {
        const policyNames = {
            'ethics': 'Ethics',
            'risk': 'Risk Management',
            'data': 'Data Governance',
            'security': 'Security',
            'model': 'Model Management',
            'vendor': 'Procurement & Vendor Management',
            'usecase': 'Use Case Evaluation',
            'master': 'Governance Master'
        };
        
        return policyNames[policyType] || 'Ethics';
    }

    /**
     * Call Claude API to generate policy
     * @param {String} prompt - The formatted prompt for Claude
     * @returns {Promise<String>} - Generated policy
     */
    async callClaude(prompt) {
        try {
            const response = await axios.post(
                this.apiEndpoint,
                {
                    model: this.model,
                    max_tokens: 4000,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': this.apiKey,
                        'anthropic-version': '2023-06-01'
                    }
                }
            );
            
            return response.data.content[0].text;
        } catch (error) {
            console.error('Error calling Claude API:', error.response?.data || error.message);
            throw new Error(`Failed to generate policy with Claude: ${error.message}`);
        }
    }

    /**
     * Generate multiple policies based on form data
     * @param {Object} formData - Form data from the generator.html
     * @returns {Promise<Object>} - Object with policy types as keys and generated policies as values
     */
    async generatePolicies(formData) {
        const policyPromises = [];
        const policyResults = {};
        
        // Check which policies were selected and generate them
        if (formData.get('policy-ethics')) {
            policyPromises.push(this.generatePolicy(formData, 'ethics')
                .then(policy => { policyResults.ethics = policy; }));
        }
        
        if (formData.get('policy-risk')) {
            policyPromises.push(this.generatePolicy(formData, 'risk')
                .then(policy => { policyResults.risk = policy; }));
        }
        
        if (formData.get('policy-data')) {
            policyPromises.push(this.generatePolicy(formData, 'data')
                .then(policy => { policyResults.data = policy; }));
        }
        
        if (formData.get('policy-security')) {
            policyPromises.push(this.generatePolicy(formData, 'security')
                .then(policy => { policyResults.security = policy; }));
        }
        
        if (formData.get('policy-model')) {
            policyPromises.push(this.generatePolicy(formData, 'model')
                .then(policy => { policyResults.model = policy; }));
        }
        
        if (formData.get('policy-vendor')) {
            policyPromises.push(this.generatePolicy(formData, 'vendor')
                .then(policy => { policyResults.vendor = policy; }));
        }
        
        if (formData.get('policy-usecase')) {
            policyPromises.push(this.generatePolicy(formData, 'usecase')
                .then(policy => { policyResults.usecase = policy; }));
        }

        // Wait for all policies to be generated
        await Promise.all(policyPromises);
        
        return policyResults;
    }
}

// Export the agent class for use in other files
module.exports = ClaudePolicyAgent;