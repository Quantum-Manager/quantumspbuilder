<?php
/**
 * @package    quantummanager
 *
 * @author     Dmitry Tsymbal <cymbal@delo-design.ru>
 * @copyright  Copyright © 2019 Delo Design & NorrNext. All rights reserved.
 * @license    GNU General Public License version 3 or later; see license.txt
 * @link       https://www.norrnext.com
 */

use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Database\DatabaseDriver;

defined('_JEXEC') or die;

/**
 * Quantumyoothemepro plugin.
 *
 * @package   quantumyoothemepro
 * @since     1.0.0
 */
class plgSystemQuantumspbuilder extends CMSPlugin
{
	/**
	 * Application object
	 *
	 * @var    CMSApplication
	 * @since  1.0.0
	 */
	protected $app;

	/**
	 * Database object
	 *
	 * @var    DatabaseDriver
	 * @since  1.0.0
	 */
	protected $db;

	/**
	 * Affects constructor behavior. If true, language files will be loaded automatically.
	 *
	 * @var    boolean
	 * @since  1.0.0
	 */
	protected $autoloadLanguage = true;


	/**
	 * onAfterRender.
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function onBeforeCompileHead()
	{

		$admin = $this->app->isClient('administrator');
		$option = $this->app->input->getCmd('option', '');
		$view = $this->app->input->getCmd('view', '');
		$layout = $this->app->input->getCmd('layout', '');
        $config = Factory::getConfig();
        $check = false;

        if($admin)
		{
		    $check = ($option === 'com_sppagebuilder' && $view === 'page' && $layout === 'edit');
		}
		else
        {
            if(!$config->get('shared_session', false))
            {
                return;
            }
            $check = ($option === 'com_sppagebuilder' && $view === 'form' && $layout === 'edit');
        }

		if($check)
		{
            HTMLHelper::_('stylesheet', 'plg_system_quantumspbuilder/spbuilder.css', [
                'version' => filemtime(__FILE__),
                'relative' => true
            ]);

            HTMLHelper::_('script', 'plg_system_quantumspbuilder/modal.js', [
                'version' => filemtime(__FILE__),
                'relative' => true
            ]);

            HTMLHelper::_('script', 'com_quantummanager/utils.js', [
                'version' => filemtime(__FILE__),
                'relative' => true
            ]);


            JLoader::register('QuantummanagerHelper', JPATH_SITE . '/administrator/components/com_quantummanager/helpers/quantummanager.php');
            QuantummanagerHelper::loadLang();

            $insert = htmlspecialchars(Text::_('COM_QUANTUMMANAGER_ACTION_SELECT'), ENT_QUOTES);
            $cancel = htmlspecialchars(Text::_('COM_QUANTUMMANAGER_ACTION_CANCEL'), ENT_QUOTES);
            Factory::getDocument()->addScriptDeclaration(<<<EOT
window.QuantumSpbuilderLang = {
		'insert': "{$insert}",
		'cancel': "{$cancel}",
};
EOT
            );
		}

        if($option === 'com_sppagebuilder' && $view === 'media')
        {

            HTMLHelper::_('stylesheet', 'plg_system_quantumspbuilder/formain.css', [
                'version' => filemtime(__FILE__),
                'relative' => true
            ]);

            HTMLHelper::_('script', 'plg_system_quantumspbuilder/formain.js', [
                'version' => filemtime(__FILE__),
                'relative' => true
            ]);
        }


	}


	public function onAjaxQuantumspbuilder()
	{
        $admin = $this->app->isClient('administrator');
        $config = Factory::getConfig();

        if(!$admin)
        {
            if(!$config->get('shared_session', false))
            {
                return;
            }
        }

        $layout = new FileLayout('select', JPATH_SITE . '/plugins/system/quantumspbuilder/tmpl');
		echo $layout->render();
		//$this->app->close();
	}

}
