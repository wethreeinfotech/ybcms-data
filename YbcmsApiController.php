<?php

namespace Drupal\ybcms_api\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\ybcms_api\Service\YbcmsApiService;
use Drupal\ybcms_api\Service\EncryptionService;
use Drupal\Core\Language\LanguageManagerInterface;

class YbcmsApiController extends ControllerBase {

  protected $service;
  protected $encryption;
  protected $languageManager;

  public function __construct(
      YbcmsApiService $service,
      EncryptionService $encryption,
      LanguageManagerInterface $language_manager
  ) {
    $this->service = $service;
    $this->encryption = $encryption;
    $this->languageManager = $language_manager;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('ybcms_api.api_service'),
      $container->get('ybcms_api.encryption'),
      $container->get('language_manager')
    );
  }

  /**
   * ==============================
   * GET TESTIMONIALS API
   * ==============================
   */
  public function getTestimonials(Request $request) {

    $content = $request->getContent();
    $userName = null;
    $content_data = [];

    if (!empty($content)) {
        try {
            $decoded = json_decode($content, true);

            // userName MUST be present
            if (!isset($decoded['userName']) || empty($decoded['userName'])) {
                return new JsonResponse([
                    'statusCode' => 400,
                    'statusMessage' => 'Missing userName in request.',
                    'data' => '',
                ], 400);
            }

            $userName = $decoded['userName'];

            // If encrypted data exists → decrypt it
            if (!empty($decoded['data'])) {
                $encryptedData = $decoded['data'];

                $content_data = $this->encryption->decrypt_dynamic(
                    $encryptedData,
                    $userName
                );

            } 
            else {
                // No encrypted data → use raw JSON body
                $content_data = $decoded;
            }

        } catch (\Exception $e) {
            return new JsonResponse([
                'statusCode' => 400,
                'statusMessage' => 'Failed to process request: ' . $e->getMessage(),
                'data' => '',
            ], 400);
        }
    }

    // Default language, showOnHome, category
    $langcode = $content_data['langcode'] ?? $this->languageManager->getDefaultLanguage()->getId();
    $showOnHome = $content_data['show_on_home'] ?? null;

    $categories = (!empty($content_data['category']))
        ? array_map('trim', explode(',', $content_data['category']))
        : null;

    try {
      $data = $this->service->getTestimonials($langcode, $showOnHome, $categories);

      return new JsonResponse([
        'statusCode' => 200,
        'statusMessage' => 'Testimonials fetched successfully.',
        'data' => $this->encryption->encrypt_dynamic($data, $userName),
      ]);

    } catch (\Exception $e) {
      return new JsonResponse([
        'statusCode' => 500,
        'statusMessage' => 'Internal error: ' . $e->getMessage(),
        'data' => [],
      ]);
    }
  }


  /**
   * ==============================
   * GET TESTIMONIAL CATEGORIES
   * ==============================
   */
  
  public function getTestimonialCategories(Request $request) {

    $content = $request->getContent();
    $userName = null;
    $content_data = [];

    if (!empty($content)) {
        try {
            $decoded = json_decode($content, true);

            // userName MUST be present
            if (!isset($decoded['userName']) || empty($decoded['userName'])) {
                return new JsonResponse([
                    'statusCode' => 400,
                    'statusMessage' => 'Missing userName in request.',
                    'data' => '',
                ], 400);
            }

            $userName = $decoded['userName'];

            // If encrypted data exists → decrypt it
            if (!empty($decoded['data'])) {
                $encryptedData = $decoded['data'];

                $content_data = $this->encryption->decrypt_dynamic(
                    $encryptedData,
                    $userName
                );

            } 
            else {
                // No encrypted data → use raw JSON body
                $content_data = $decoded;
            }

        } catch (\Exception $e) {
            return new JsonResponse([
                'statusCode' => 400,
                'statusMessage' => 'Failed to process request: ' . $e->getMessage(),
                'data' => '',
            ], 400);
        }
    }

    // Get language
    $langcode = $content_data['langcode'] ?? $this->languageManager->getDefaultLanguage()->getId();

    try {
        $data = $this->service->getTestimonialCategories($langcode);
        return new JsonResponse([
            'statusCode' => 200,
            'statusMessage' => 'Testimonial Categories fetched successfully.',
            'data' => $this->encryption->encrypt_dynamic($data, $userName),
        ]);

    } catch (\Exception $e) {
        return new JsonResponse([
            'statusCode' => 500,
            'statusMessage' => 'Internal error: ' . $e->getMessage(),
            'data' => [],
        ]);
    }
}


  /**
   * ==============================
   * GET HOMEPAGE SLIDERS
   * ==============================
   */
  public function getHomepageSliders(Request $request) {

    $content = $request->getContent();
    $userName = 'default';

    if (!empty($content)) {
      $decoded = json_decode($content, true);
      if (!empty($decoded['userName'])) {
        $userName = $decoded['userName'];
      }
    }

    try {
      $data = $this->service->getHomepageSliders();

      return new JsonResponse([
        'statusCode' => 200,
        'statusMessage' => 'Homepage Sliders fetched successfully.',
        'data' => $this->encryption->encrypt_dynamic($data, $userName),
      ]);

    } catch (\Exception $e) {
      return new JsonResponse([
        'statusCode' => 500,
        'statusMessage' => 'Internal error: ' . $e->getMessage(),
        'data' => [],
      ]);
    }
  }


  /**
   * ==============================
   * CREATE ARTICLE
   * ==============================
   */
  public function createArticle(Request $request) {

    $content = $request->getContent();
    if (empty($content)) {
      return new JsonResponse([
        'statusCode' => 400,
        'statusMessage' => 'Empty request payload.',
        'data' => '',
      ], 400);
    }

    try {
      $decoded = json_decode($content, true);

      if (!isset($decoded['userName'])) {
        return new JsonResponse([
          'statusCode' => 400,
          'statusMessage' => 'Missing userName in request.',
          'data' => '',
        ], 400);
      }

      $userName = $decoded['userName'];
      $encryptedData = $decoded['data'];

      $data = $this->encryption->decrypt_dynamic($encryptedData, $userName);

    } catch (\Exception $e) {
      return new JsonResponse([
        'statusCode' => 400,
        'statusMessage' => 'Failed to decrypt request: ' . $e->getMessage(),
        'data' => '',
      ], 400);
    }

    // Validate required fields
    if (empty($data['title']) || empty($data['body'])) {
      return new JsonResponse([
        'statusCode' => 422,
        'statusMessage' => 'Missing title or body fields.',
        'data' => '',
      ], 422);
    }

    // Create the article
    $node = \Drupal\node\Entity\Node::create([
      'type' => 'article',
      'title' => $data['title'],
      'body' => [
        'value' => $data['body'],
        'format' => 'basic_html',
      ],
    ]);
    $node->save();

    $responseData = [
      'id' => $node->id(),
      'title' => $node->label(),
    ];

    return new JsonResponse([
      'statusCode' => 200,
      'statusMessage' => 'Article created successfully.',
      'data' => $this->encryption->encrypt_dynamic($responseData, $userName),
    ]);
  }

}
