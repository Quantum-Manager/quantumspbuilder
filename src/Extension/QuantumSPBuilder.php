<?php

namespace Joomla\Plugin\System\QuantumSPBuilder\Extension;

/**
 * @package    quantummanager
 *
 * @author     Dmitry Tsymbal <cymbal@delo-design.ru>
 * @copyright  Copyright © 2019 Delo Design & NorrNext. All rights reserved.
 * @license    GNU General Public License version 3 or later; see license.txt
 * @link       https://www.norrnext.com
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\WebAsset\WebAssetManager;
use Joomla\Component\QuantumManager\Administrator\Helper\QuantummanagerHelper;
use Joomla\Event\SubscriberInterface;

class QuantumSPBuilder extends CMSPlugin implements SubscriberInterface
{
	protected $app;

	protected $db;

	protected $autoloadLanguage = true;

	public static function getSubscribedEvents(): array
	{
		return [
			'onBeforeCompileHead'    => 'onBeforeCompileHead',
			'onAjaxQuantumspbuilder' => 'onAjax',
		];
	}

	public function onBeforeCompileHead(): void
	{
		$admin  = $this->app->isClient('administrator');
		$option = $this->app->input->getCmd('option', '');
		$view   = $this->app->input->getCmd('view', '');
		$layout = $this->app->input->getCmd('layout', '');

		if ($admin)
		{
			$check = ($option === 'com_sppagebuilder' && $view === 'page' && $layout === 'edit');
		}
		else
		{
			if (!$this->accessCheck())
			{
				return;
			}

			$check = ($option === 'com_sppagebuilder' && $view === 'form' && $layout === 'edit');
		}

		if ($check)
		{
			HTMLHelper::_('stylesheet', 'plg_system_quantumspbuilder/spbuilder.css', [
				'version'  => filemtime(__FILE__),
				'relative' => true
			]);

			HTMLHelper::_('script', 'plg_system_quantumspbuilder/modal.js', [
				'version'  => filemtime(__FILE__),
				'relative' => true
			]);

			HTMLHelper::_('script', 'com_quantummanager/utils.js', [
				'version'  => filemtime(__FILE__),
				'relative' => true
			]);

			QuantummanagerHelper::loadLang();

			$insert = htmlspecialchars(Text::_('COM_QUANTUMMANAGER_ACTION_SELECT'), ENT_QUOTES);
			$cancel = htmlspecialchars(Text::_('COM_QUANTUMMANAGER_ACTION_CANCEL'), ENT_QUOTES);

			/** @var WebAssetManager $wa */
			$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
			$wa->addInlineScript(<<<EOT
window.QuantumSpbuilderLang = {
		'insert': "{$insert}",
		'cancel': "{$cancel}",
};
EOT
			);
		}

		if ($option === 'com_sppagebuilder' && $view === 'media')
		{
			HTMLHelper::_('stylesheet', 'plg_system_quantumspbuilder/formain.css', [
				'version'  => filemtime(__FILE__),
				'relative' => true
			]);

			HTMLHelper::_('script', 'plg_system_quantumspbuilder/formain.js', [
				'version'  => filemtime(__FILE__),
				'relative' => true
			]);
		}
	}

	public function onAjax(): void
	{
		if (!$this->accessCheck())
		{
			return;
		}

		$layout = new FileLayout('select', JPATH_SITE . '/plugins/system/quantumspbuilder/tmpl');
		echo $layout->render();
	}

	private function accessCheck(): bool
	{
		if ($this->app->isClient('administrator'))
		{
			return true;
		}

		if (!(int) QuantummanagerHelper::getParamsComponentValue('front', 0))
		{
			return false;
		}

		if (Factory::getApplication()->getIdentity()->id === 0)
		{
			return false;
		}

		return true;
	}

}
