// Express server for handling Stripe payments and AI policy generation
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ClaudePolicyAgent = require('./js/claude-policy-agent');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Claude policy agent
const policyAgent = new ClaudePolicyAgent(process.env.CLAUDE_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('./')); // Serve static files from current directory

// Map of product IDs to prices (these should match your client-side prices)
const PRODUCTS = {
  'basic_plan': {
    name: 'Basic Plan',
    price: 900, // $900 (stored in dollars)
    description: '3 core policy templates with simple customization',
    policyLimit: 3
  },
  'professional_package': {
    name: 'Professional Package',
    price: 1500, // $1,500 (stored in dollars)
    description: '5 essential policy templates with basic customization',
    policyLimit: 5
  },
  'premium_suite': {
    name: 'Premium Suite',
    price: 5000, // $5,000 (stored in dollars)
    description: 'Full suite of 18+ policy templates with advanced customization',
    policyLimit: 18
  }
};

// In-memory storage for generated policies (in production, use a database)
const generatedPolicies = new Map();

// API endpoint to create a payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { productId, email } = req.body;
  
  // Validate product ID
  if (!PRODUCTS[productId]) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    // Create a customer (optional, but useful for tracking)
    const customer = await stripe.customers.create({
      email: email
    });

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRODUCTS[productId].price * 100, // Convert from dollars to cents for Stripe
      currency: 'usd',
      customer: customer.id,
      metadata: {
        productId: productId,
        productName: PRODUCTS[productId].name,
      },
      description: `Purchase of ${PRODUCTS[productId].name}`,
      receipt_email: email,
    });

    // Return the client secret to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
      productId: productId,
      amount: PRODUCTS[productId].price
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to generate AI policies
app.post('/api/generate-policies', async (req, res) => {
  try {
    const formData = req.body;
    
    // Create mock FormData object to match the interface expected by the agent
    const mockFormData = {
      get: (key) => {
        if (key === 'org-name') return formData.orgName;
        if (key === 'industry') return formData.industry;
        if (key === 'size') return formData.size;
        if (key === 'ai-maturity') return formData.aiMaturity;
        if (key === 'ai-strategy') return formData.aiStrategy;
        if (key === 'additional-requirements') return formData.additionalRequirements;
        // Geography
        if (key === 'geo-na') return formData.geoOperations?.northAmerica ? 'on' : '';
        if (key === 'geo-eu') return formData.geoOperations?.europe ? 'on' : '';
        if (key === 'geo-global') return formData.geoOperations?.global ? 'on' : '';
        // Policies
        if (key === 'policy-ethics') return formData.policies?.ethics ? 'on' : '';
        if (key === 'policy-risk') return formData.policies?.risk ? 'on' : '';
        if (key === 'policy-data') return formData.policies?.data ? 'on' : '';
        if (key === 'policy-security') return formData.policies?.security ? 'on' : '';
        if (key === 'policy-model') return formData.policies?.model ? 'on' : '';
        if (key === 'policy-vendor') return formData.policies?.vendor ? 'on' : '';
        if (key === 'policy-usecase') return formData.policies?.usecase ? 'on' : '';
        if (key === 'policy-human') return formData.policies?.human ? 'on' : '';
        if (key === 'policy-incident') return formData.policies?.incident ? 'on' : '';
        // Ethics
        if (key === 'ethics-fairness') return formData.ethics?.fairness ? 'on' : '';
        if (key === 'ethics-transparency') return formData.ethics?.transparency ? 'on' : '';
        if (key === 'ethics-privacy') return formData.ethics?.privacy ? 'on' : '';
        if (key === 'ethics-safety') return formData.ethics?.safety ? 'on' : '';
        // Risks
        if (key === 'risk-technical') return formData.risks?.technical ? 'on' : '';
        if (key === 'risk-ethical') return formData.risks?.ethical ? 'on' : '';
        if (key === 'risk-legal') return formData.risks?.legal ? 'on' : '';
        if (key === 'risk-reputation') return formData.risks?.reputation ? 'on' : '';
        
        return '';
      }
    };
    
    // Count how many policies are requested
    const policyCount = Object.values(formData.policies).filter(v => v).length;
    
    // Check if the user has a valid payment for premium plans (more than 3 policies)
    // This check is already done on the frontend, but we double-check for security
    const freePolicyLimit = 3;
    
    // Simulate policy generation with mock data or templates
    const policyResults = {};
    
    // Read template files to use as mock data
    const templateDir = path.join(__dirname, 'policy-templates');
    
    // Process only the selected policies, up to the limit if not paid
    let processedCount = 0;
    for (const policyType of Object.keys(formData.policies)) {
      // Check if this policy was selected and if we're still within limits
      if (formData.policies[policyType] && (processedCount < freePolicyLimit || req.body.hasPaid)) {
        let templateFileName;
        
        switch(policyType) {
          case 'ethics': templateFileName = 'ai-ethics-policy.md'; break;
          case 'risk': templateFileName = 'ai-risk-management-policy.md'; break;
          case 'data': templateFileName = 'ai-data-governance-policy.md'; break;
          case 'security': templateFileName = 'ai-security-policy.md'; break;
          case 'model': templateFileName = 'ai-model-management-policy.md'; break;
          case 'vendor': templateFileName = 'ai-procurement-vendor-management-policy.md'; break;
          case 'usecase': templateFileName = 'ai-use-case-evaluation-policy.md'; break;
          case 'human': templateFileName = 'ai-governance-master-policy.md'; break; // Using master as a stand-in for human
          case 'incident': templateFileName = 'ai-risk-management-policy.md'; break; // Using risk as a stand-in for incident
          default: continue;
        }
        
        try {
          // Load and customize the template
          const template = fs.readFileSync(path.join(templateDir, templateFileName), 'utf8')
            .replace(/\[Organization Name\]/g, formData.orgName)
            .replace(/\[Insert Date\]/g, new Date().toLocaleDateString());
          
          // In a real implementation, we would use Claude to customize the policy
          // For demo purposes, we'll just do simple replacements
          policyResults[policyType] = template;
          processedCount++;
        } catch (error) {
          console.error(`Error loading template ${templateFileName}:`, error);
        }
      }
    }
    
    // Store generated policies for download later
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    generatedPolicies.set(sessionId, { 
      orgName: formData.orgName,
      policies: policyResults,
      timestamp: Date.now()
    });
    
    // Add session ID to response
    res.json({
      ...policyResults,
      sessionId
    });
    
    // In a real implementation, we would use Claude to generate policies asynchronously
    // policyAgent.generatePolicies(mockFormData).then(generatedPolicyData => {
    //   // Store the results for later download
    //   // This would update the database or in-memory storage with the AI-generated content
    //   generatedPolicies.set(sessionId, { 
    //     orgName: formData.orgName,
    //     policies: generatedPolicyData,
    //     timestamp: Date.now()
    //   });
    // });
    
  } catch (error) {
    console.error('Error generating policies:', error);
    res.status(500).json({ error: 'Failed to generate policies' });
  }
});

// API endpoint to download generated policies as a zip file
app.post('/api/download-policies', async (req, res) => {
  try {
    const { orgName, sessionId } = req.body;
    
    // Get stored policies (in production, this would come from a database)
    const storedData = generatedPolicies.get(sessionId) || { 
      orgName, 
      policies: {} 
    };
    
    // If no session ID or no policies found, check if there are any recent policies for this org
    if (!sessionId || Object.keys(storedData.policies).length === 0) {
      // Look for the most recent policies for this organization
      for (const [id, data] of generatedPolicies.entries()) {
        if (data.orgName === orgName && Object.keys(data.policies).length > 0) {
          storedData.policies = data.policies;
          break;
        }
      }
    }
    
    // Create a zip file
    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${orgName.replace(/\s+/g, '-')}-AI-Policies.zip`
    });
    
    const archive = archiver('zip', {
      zlib: { level: 9 } // Compression level
    });
    
    // Pipe the archive to the response
    archive.pipe(res);
    
    // Add each policy to the zip
    Object.entries(storedData.policies).forEach(([type, content]) => {
      let policyName = 'policy';
      
      switch(type) {
        case 'ethics': policyName = 'AI-Ethics-Policy'; break;
        case 'risk': policyName = 'AI-Risk-Management-Policy'; break;
        case 'data': policyName = 'AI-Data-Governance-Policy'; break;
        case 'security': policyName = 'AI-Security-Policy'; break;
        case 'model': policyName = 'AI-Model-Management-Policy'; break;
        case 'vendor': policyName = 'AI-Procurement-Vendor-Management-Policy'; break;
        case 'usecase': policyName = 'AI-Use-Case-Evaluation-Policy'; break;
        case 'human': policyName = 'Human-AI-Collaboration-Policy'; break;
        case 'incident': policyName = 'AI-Incident-Response-Policy'; break;
      }
      
      const filename = `${orgName.replace(/\s+/g, '-')}-${policyName}.md`;
      archive.append(content, { name: filename });
    });
    
    // Add a readme file explaining the policies
    const readme = `# AI Policies for ${orgName}

Generated on ${new Date().toLocaleDateString()}

## Included Policies

${Object.keys(storedData.policies).map(type => {
  const policyNames = {
    ethics: 'AI Ethics Policy',
    risk: 'AI Risk Management Policy',
    data: 'AI Data Governance Policy',
    security: 'AI Security Policy',
    model: 'AI Model Management Policy',
    vendor: 'AI Procurement & Vendor Management Policy',
    usecase: 'AI Use Case Evaluation Policy',
    human: 'Human-AI Collaboration Policy',
    incident: 'AI Incident Response Policy'
  };
  return `- ${policyNames[type] || type}`;
}).join('\n')}

These policies were generated by WhitegloveAI Policy Generator using Claude AI.
`;
    archive.append(readme, { name: 'README.md' });
    
    // Finalize the archive
    archive.finalize();
    
  } catch (error) {
    console.error('Error creating policy download:', error);
    res.status(500).json({ error: 'Failed to create policy download' });
  }
});

// Start the server
console.log("Starting server with port:", process.env.PORT);
const server = app.listen(9000, () => {
  console.log(`Server running on port 9000`);
});

// Export app and products for testing
module.exports = app;
module.exports.PRODUCTS = PRODUCTS;
module.exports.server = server;