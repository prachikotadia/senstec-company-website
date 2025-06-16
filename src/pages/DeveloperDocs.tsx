
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, ExternalLink, Shield, AlertTriangle } from 'lucide-react';

const DeveloperDocs = () => {
  const { docType } = useParams();
  const navigate = useNavigate();

  const docs = {
    'rest-api': {
      title: 'REST API Documentation',
      description: 'Complete API reference for accessing sensor data and analytics with security best practices',
      content: {
        overview: 'Our REST API provides secure, authenticated access to all sensor data, analytics, and configuration options. All endpoints require proper authentication and implement rate limiting.',
        security: {
          authentication: 'Bearer token authentication required for all endpoints',
          rateLimit: '1000 requests per hour per API key',
          encryption: 'All data transmitted over HTTPS with TLS 1.3',
          validation: 'Input validation and sanitization on all endpoints'
        },
        endpoints: [
          { 
            method: 'GET', 
            path: '/api/v1/sensors', 
            description: 'List all sensors (requires sensors:read permission)',
            headers: ['Authorization: Bearer {token}', 'Content-Type: application/json']
          },
          { 
            method: 'GET', 
            path: '/api/v1/sensors/{id}/data', 
            description: 'Get sensor data (requires data:read permission)',
            headers: ['Authorization: Bearer {token}', 'Content-Type: application/json']
          },
          { 
            method: 'POST', 
            path: '/api/v1/analytics/predict', 
            description: 'Run predictive analysis (requires analytics:create permission)',
            headers: ['Authorization: Bearer {token}', 'Content-Type: application/json']
          }
        ],
        examples: [
          {
            title: 'Secure Authentication',
            code: `// Never store API keys in frontend code!
// Use environment variables on your backend server

const apiKey = process.env.SENSTEC_API_KEY;
const response = await fetch('https://api.senstec.com/v1/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    apiKey: apiKey,
    scope: 'sensors:read data:read'
  })
});

const { token } = await response.json();`
          },
          {
            title: 'Get Sensor Data with Authentication',
            code: `// Use the token from authentication
const response = await fetch('https://api.senstec.com/v1/sensors/123/data', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
    'User-Agent': 'YourApp/1.0'
  }
});

if (!response.ok) {
  throw new Error(\`HTTP error! status: \${response.status}\`);
}

const sensorData = await response.json();`
          },
          {
            title: 'Input Validation Example',
            code: `// Always validate and sanitize input
const validateSensorId = (id) => {
  const sanitized = id.replace(/[^a-zA-Z0-9-]/g, '');
  if (sanitized.length < 1 || sanitized.length > 50) {
    throw new Error('Invalid sensor ID');
  }
  return sanitized;
};

const sensorId = validateSensorId(userInput);
const url = \`https://api.senstec.com/v1/sensors/\${sensorId}/data\`;`
          }
        ]
      }
    },
    'sdk-downloads': {
      title: 'SDK Downloads',
      description: 'Secure development kits for Python, JavaScript, and C++ with built-in security features',
      content: {
        overview: 'Our SDKs provide easy integration with your applications while maintaining security best practices including automatic token refresh, request signing, and input validation.',
        security: {
          features: [
            'Automatic API key management',
            'Built-in rate limiting',
            'Request signing and verification',
            'Input validation and sanitization',
            'Secure credential storage'
          ]
        },
        sdks: [
          { 
            name: 'Python SDK', 
            version: '2.1.0', 
            size: '2.3 MB', 
            downloadUrl: '#',
            features: ['Type hints', 'Async support', 'Automatic retries', 'Credential management']
          },
          { 
            name: 'JavaScript SDK', 
            version: '1.8.0', 
            size: '1.1 MB', 
            downloadUrl: '#',
            features: ['TypeScript support', 'Browser & Node.js', 'Automatic token refresh', 'Request interceptors']
          },
          { 
            name: 'C++ SDK', 
            version: '3.0.1', 
            size: '4.2 MB', 
            downloadUrl: '#',
            features: ['Modern C++17', 'Memory safety', 'Cross-platform', 'SSL/TLS support']
          }
        ],
        examples: [
          {
            title: 'Python SDK - Secure Initialization',
            code: `import os
from senstec import SenstecClient

# Initialize with environment variables (recommended)
client = SenstecClient(
    api_key=os.getenv('SENSTEC_API_KEY'),
    base_url='https://api.senstec.com/v1',
    timeout=30,
    max_retries=3
)

# SDK handles authentication automatically
sensors = await client.sensors.list()
for sensor in sensors:
    print(f"Sensor {sensor.id}: {sensor.name}")`
          }
        ]
      }
    }
  };

  const doc = docs[docType as keyof typeof docs];

  if (!doc) {
    return <div>Documentation not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Developers
        </Button>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-sf-pro font-bold mb-6">{doc.title}</h1>
          <p className="text-xl text-muted-foreground mb-12">{doc.description}</p>

          {/* Security Notice */}
          <Card className="glass-morphism border-green-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Security First</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 dark:text-green-300">
                All our APIs and SDKs are built with security as a priority. We implement industry-standard practices including encryption, authentication, and input validation.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{doc.content.overview}</p>
              </CardContent>
            </Card>

            {'security' in doc.content && doc.content.security && (
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {'authentication' in doc.content.security && (
                    <div className="space-y-2">
                      <p><strong>Authentication:</strong> {doc.content.security.authentication}</p>
                      <p><strong>Rate Limiting:</strong> {doc.content.security.rateLimit}</p>
                      <p><strong>Encryption:</strong> {doc.content.security.encryption}</p>
                      <p><strong>Validation:</strong> {doc.content.security.validation}</p>
                    </div>
                  )}
                  {'features' in doc.content.security && (
                    <ul className="list-disc list-inside space-y-1">
                      {doc.content.security.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            )}

            {'endpoints' in doc.content && doc.content.endpoints && (
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doc.content.endpoints.map((endpoint, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-primary text-white px-2 py-1 rounded text-sm font-mono">
                            {endpoint.method}
                          </span>
                          <code className="text-sm">{endpoint.path}</code>
                        </div>
                        <p className="text-muted-foreground mb-2">{endpoint.description}</p>
                        {'headers' in endpoint && (
                          <div className="text-sm">
                            <strong>Required Headers:</strong>
                            <ul className="list-disc list-inside ml-4 mt-1">
                              {endpoint.headers.map((header, hIndex) => (
                                <li key={hIndex} className="font-mono text-xs">{header}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {'sdks' in doc.content && doc.content.sdks && (
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Available SDKs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {doc.content.sdks.map((sdk, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{sdk.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">Version {sdk.version}</p>
                        <p className="text-sm text-muted-foreground mb-3">{sdk.size}</p>
                        {'features' in sdk && (
                          <ul className="text-xs text-muted-foreground mb-4 space-y-1">
                            {sdk.features.map((feature, fIndex) => (
                              <li key={fIndex}>• {feature}</li>
                            ))}
                          </ul>
                        )}
                        <Button className="w-full gradient-purple">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {'examples' in doc.content && doc.content.examples && (
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Code Examples</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Security Note:</strong> Never hardcode API keys in your client-side code. Always use environment variables and secure backend services.
                    </p>
                  </div>
                  {doc.content.examples.map((example, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="font-semibold mb-3">{example.title}</h3>
                      <div className="bg-black/90 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDocs;
